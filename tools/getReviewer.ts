#!/usr/bin/env node

// tslint:disable:no-console

/**
 * Usage example:
 * npm run slack:find-users jamil niyazi vahab fuad gurban lala maksim
 */

import { writeFileSync } from 'fs';

import { Provider } from '../src/enums';
import { IReviewer } from '../src/models';
import { githubProvider } from './providers/githubProvider';
import { IProvider } from './providers/models';
import { slackProvider } from './providers/slackProvider';

export async function main (): Promise<any> {
    const [, , ...namesToFindBy] = process.argv;

    try {
        const providers: IProvider<any>[] = [githubProvider, slackProvider];
        const result: { [K in Provider]?: Partial<IReviewer>[] } = {};

        const promises = providers.map(async (provider) => {
            const name = provider.getProviderName();
            const users = await provider.getAllUsers();
            const filteredUsers = provider.findUsers(namesToFindBy, users);
            const reviewers = filteredUsers.map(provider.convertToReviewer);

            result[name] = reviewers;
        });
        await Promise.all(promises);

        console.log(result);
        writeFileSync('./tools/getReviewer.dump.json', JSON.stringify(result, null, 4));
    } catch (error) {
        console.error(error);
    }
}
