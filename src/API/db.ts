import firebase from 'firebase/app';
import 'firebase/firestore';

import { getEnvironment } from '../environment';
import { IDBConfig } from '../models';

let db: firebase.firestore.Firestore;

export function getDBInstance (): firebase.firestore.Firestore {
    if (!db) {
        const env = getEnvironment();
        const config: IDBConfig = {
            apiKey: env.firebaseApiKey,
            authDomain: env.firebaseAuthDomain,
            projectId: env.firebaseProjectId,
        };

        firebase.initializeApp(config);
        db = firebase.firestore();
    }
    return db;
}
