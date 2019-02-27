#!/usr/bin/env node

import { writeFileSync } from 'fs';

import { getDBInstance } from '../src/API/db';

export async function main (): Promise<any> {
    const db = getDBInstance();
    const snapshot = await db.collection('camps').get();
    const data = snapshot.docs.map((doc) => doc.data());

    writeFileSync('./tools/firebase.dump.json', JSON.stringify(data, null, 4));
    process.exit();
}
