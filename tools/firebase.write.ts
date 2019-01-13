#!/usr/bin/env node

import { readFileSync } from 'fs';

import { db } from '../src/db';
import { ICamp } from '../src/models';

const camps: ICamp[] = JSON.parse(readFileSync('./tools/firebase.backup.json').toString());
const requests = camps.map((camp) => db.collection('camps').add(camp));

Promise.all(requests).then(() => process.exit());
