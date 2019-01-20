import firebase from 'firebase/app';
import 'firebase/firestore';

import { FIRESTORE_CONFIG } from './config';
import { EnvironmentVariable, NodeEnv } from './enums';
import { getEnvironmentVariableValue } from './utils';

const nodeEnv = getEnvironmentVariableValue(EnvironmentVariable.NodeEnv) as NodeEnv;
const config = (nodeEnv && FIRESTORE_CONFIG[nodeEnv]) || FIRESTORE_CONFIG[NodeEnv.Staging];

firebase.initializeApp(config!);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({ timestampsInSnapshots: true });
