import firebase from 'firebase/app';
import 'firebase/firestore';

import { FIRESTORE_CONFIG } from './config';

firebase.initializeApp(
    process.env.NODE_ENV === 'production'
        ? FIRESTORE_CONFIG.prod
        : FIRESTORE_CONFIG.staging
);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({ timestampsInSnapshots: true });
