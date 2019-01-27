import firebase from 'firebase/app';
import 'firebase/firestore';

import { FIRESTORE_CONFIG } from '../config';

firebase.initializeApp(FIRESTORE_CONFIG);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({ timestampsInSnapshots: true });
