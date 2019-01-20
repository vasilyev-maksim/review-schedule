export enum EnvironmentVariable {
    NodeEnv = 'NODE_ENV',
    Mock = 'MOCK',
}

export enum NodeEnv {
    /** Developer's local machine. */
    Development = 'development',
    /** https://review-schedule.firebaseapp.com */
    Production = 'production',
    /** https://review-schedule-staging.firebaseapp.com */
    Staging = 'staging',
}
