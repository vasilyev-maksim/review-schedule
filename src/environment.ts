// tslint:disable:object-literal-sort-keys

import { NodeEnv } from './enums';

// tslint:disable-next-line:typedef
export function getEnvironment () {
    return {
        nodeEnv: process.env.NODE_ENV as NodeEnv || NodeEnv.Development,
        mockAPI: process.env.MOCK_API === 'true',
        mockCurrentDate: process.env.MOCK_CURRENT_DATE !== 'false' && process.env.MOCK_CURRENT_DATE,
        firebaseApiKey: process.env.FIREBASE_API_KEY!,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN!,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID!,
    };
}
