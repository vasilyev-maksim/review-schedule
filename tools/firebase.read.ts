#!/usr/bin/env node

import { writeFileSync } from 'fs';

import { db } from '../src/db';

db.collection('camps').get().then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());

    writeFileSync('./tools/firebase.dump.json', JSON.stringify(data, null, 4));
    process.exit();
});
