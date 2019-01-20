export enum NodeEnv {
    /** Developer's local machine */
    Development = 'development',
    /** https://review-schedule.firebaseapp.com */
    Production = 'production',
    /** https://review-schedule-staging.firebaseapp.com */
    Staging = 'staging',
}

export enum Provider {
    Slack = 'Slack',
    GitHub = 'GitHub',
}
