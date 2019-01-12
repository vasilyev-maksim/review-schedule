import firebase from 'firebase/app';
import 'firebase/firestore';

export const config = {
    apiKey: 'AIzaSyD7GbTdXaagmPBXX0tdX_O7U721Tb0q4pc',
    authDomain: 'review-schedule.firebaseapp.com',
    projectId: 'review-schedule'
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({ timestampsInSnapshots: true });
