#!/usr/bin/env node

import { readFileSync } from 'fs';

import { db } from '../src/db';

const dump = JSON.parse(readFileSync('./tools/firebase.dump.json').toString());

db.collection('squads').add(dump)
    .then(() => process.exit());
