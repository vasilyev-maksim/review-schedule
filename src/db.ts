import firebase from 'firebase/app';
import 'firebase/firestore';

import { FIRESTORE_CONFIG } from './config';
import { NodeEnv } from './enums';
import { environment } from './environment';

const config = FIRESTORE_CONFIG[environment.nodeEnv] || FIRESTORE_CONFIG[NodeEnv.Development];

firebase.initializeApp(config!);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({ timestampsInSnapshots: true });
