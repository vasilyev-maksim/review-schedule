#!/usr/bin/env node

// tslint:disable:no-console

/**
 * Usage example:
 * npm run slack:find-users jamil niyazi vahab fuad gurban lala maksim
 */

import { writeFileSync } from 'fs';

import { slackProvider } from './providers/slackProvider';

async function main (): Promise<any> {
    const [, , ..._namesToFindBy] = process.argv;
    const namesToFindBy = _namesToFindBy.map((name) => name.toLowerCase());

    try {
        const users = await slackProvider.findReviewers(namesToFindBy);
        console.log(users);
        writeFileSync('./tools/slack.dump.json', JSON.stringify(users, null, 4));
    } catch (error) {
        console.error(error);
    }
}

main();
