#!/usr/bin/env node

import { getDBInstance } from '../src/API/db';
import { writeOutputJsonToFile } from './utils';

export async function main (): Promise<any> {
    const db = getDBInstance();
    const snapshot = await db.collection('camps').get();
    const data = snapshot.docs.map((doc) => doc.data());

    writeOutputJsonToFile('./tools/firebase.dump.json', data);
    process.exit();
}
