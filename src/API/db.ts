import firebase from 'firebase/app';
import 'firebase/firestore';

import { FIRESTORE_CONFIG } from '../config';

let db: firebase.firestore.Firestore;

export function getDBInstance (): firebase.firestore.Firestore {
    if (!db) {
        firebase.initializeApp(FIRESTORE_CONFIG);
        db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });
    }
    return db;
}
