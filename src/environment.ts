import { NodeEnv } from './enums';

export const environment = {
    /** Indicates whether to mock API */
    mockAPI: process.env.MOCK_API === 'true',
    /** NODE_ENV */
    nodeEnv: process.env.NODE_ENV as NodeEnv || NodeEnv.Development,
};
