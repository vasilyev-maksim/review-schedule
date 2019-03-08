#!/usr/bin/env node

// tslint:disable:no-console
// tslint:disable:object-literal-sort-keys

import * as inquirer from 'inquirer';
import * as moment from 'moment';
import * as ora from 'ora';

import { SERVER_DATE_FORMAT } from '../src/config';
import { IReviewer } from '../src/models';
import { githubProvider } from './providers/githubProvider';
import { IProvider } from './providers/models';
import { slackProvider } from './providers/slackProvider';
import { isSubstring, writeOutputJsonToFile } from './utils';

interface Indexer { [K: string]: any }
type Template<T> = { [K in keyof T]: T[K] | undefined } & Indexer;

export async function main (): Promise<any> {
    try {
        const providers: IProvider<any>[] = [githubProvider, slackProvider];
        const reviewer: Template<IReviewer> = {
            githubId: undefined,
            githubUsername: undefined,
            name: undefined,
            photo: undefined,
            slackId: undefined,
            surname: undefined,
            enabled: true,
            createdOn: moment().format(SERVER_DATE_FORMAT),
        };

        const partials: Array<Partial<IReviewer> & Indexer> = [];

        for (const provider of providers) {
            const providerName = provider.getProviderName();

            const loader = ora(`Loading ${providerName} users list...`).start();
            const allUsers = await provider.getAllUsers();
            loader.stop();

            const userNames = allUsers.map(provider.getUserName).filter(Boolean);

            const { query } = (await inquirer.prompt<{ query: string }>({
                type: 'autocomplete',
                name: 'query',
                message: `Enter ${providerName} user name`,
                source: (_: any, input: string) => {
                    const names = input
                        ? userNames.filter((name) => isSubstring(name, input))
                        : userNames;
                    return Promise.resolve(names);
                }
            } as any));

            const user = provider.findUserByName(query, allUsers);
            const partial = provider.convertToReviewer(user);

            partials.push(partial);
        }

        for (const prop in reviewer) {
            if (!reviewer[prop]) {
                const choices = partials
                    .map((partial) => partial[prop])
                    .filter(Boolean);
                let value: string;

                if (choices.length > 1) {
                    value = (await inquirer.prompt<{ value: string }>({
                        type: 'list',
                        name: 'value',
                        message: `Select ${prop}`,
                        choices,
                    })).value;
                } else {
                    value = choices[0];
                }

                reviewer[prop] = value;
            }
        }

        writeOutputJsonToFile('./tools/getReviewer.dump.json', reviewer);
    } catch (error) {
        console.error(error);
    }
}
