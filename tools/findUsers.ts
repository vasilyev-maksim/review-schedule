#!/usr/bin/env node

// tslint:disable:no-console

/**
 * Usage example:
 * npm run slack:find-users jamil niyazi vahab fuad gurban lala maksim
 */

import { writeFileSync } from 'fs';

import { githubProvider } from './providers/githubProvider';
import { slackProvider } from './providers/slackProvider';

async function main (): Promise<any> {
    const [, , ...namesToFindBy] = process.argv;

    try {
        const githubUsers = await githubProvider.findReviewers(namesToFindBy);
        const slackUsers = await slackProvider.findReviewers(namesToFindBy);
        const result = { githubUsers, slackUsers };

        console.log(result);
        writeFileSync('./tools/findUsers.dump.json', JSON.stringify(result, null, 4));
    } catch (error) {
        console.error(error);
    }
}

main();
