#!/usr/bin/env node

import { exec } from 'child_process';
import { readFileSync } from 'fs';

import { db } from '../src/db';
import { ICamp } from '../src/models';

async function main (): Promise<any> {
    exec('firebase firestore:delete camps -r -y', async (err) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }

        const camps: ICamp[] = JSON.parse(readFileSync('./tools/firebase.dump.json').toString());
        const requests = camps.map((camp) => db.collection('camps').add(camp));

        await Promise.all(requests);
        process.exit();
    });
}

main();
