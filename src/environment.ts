import { NodeEnv } from './enums';

// tslint:disable:object-literal-sort-keys
export const environment = {
    /** NODE_ENV */
    nodeEnv: process.env.NODE_ENV as NodeEnv || NodeEnv.Development,

    /** Indicates whether to mock API */
    mockAPI: process.env.MOCK_API === 'true',
    mockCurrentDate: process.env.MOCK_CURRENT_DATE !== 'false' && process.env.MOCK_CURRENT_DATE,
    firebaseApiKey: process.env.FIREBASE_API_KEY!,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID!,
};
