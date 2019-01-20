import { IReviewer } from './models';

export const REFERENCE_POINT = '2019-01-09';
export const DATE_FORMAT = 'DD MMM YYYY - dddd';
export const PLACEHOLDER_SQUADS_COUNT = 3;
export const SLACK_TEAM_ID = 'T9QT65P9R';
export const FIRESTORE_CONFIG = {
    prod: {
        apiKey: 'AIzaSyD7GbTdXaagmPBXX0tdX_O7U721Tb0q4pc',
        authDomain: 'review-schedule.firebaseapp.com',
        projectId: 'review-schedule'
    },
    staging: {
        apiKey: 'AIzaSyBRPDIZwbYjh8kOg8JKJ2-YCASNkWvxiVQ',
        authDomain: 'review-schedule-staging.firebaseapp.com',
        projectId: 'review-schedule-staging',
    }
};
export const SELECTED_CAMP_COOKIE_KEY = 'reviewer-camp';
export const AUTHORS: IReviewer[] = [
    {
        enabled: true,
        githubId: '42234410',
        githubUsername: 'maksim-vasilyev-pb',
        name: 'Maksim',
        photo: 'https://avatars.slack-edge.com/2019-01-14/524236277942_72daa0025e21d24edd51_48.jpg',
        slackId: 'UFCM8BWUT',
        surname: 'Vasilyev'
    },
    {
        enabled: true,
        githubId: '42533732',
        githubUsername: 'jamil-alisgandarov',
        name: 'Jamil',
        photo: 'https://avatars.slack-edge.com/2018-08-28/424478790436_0d47862072655452f619_48.jpg',
        slackId: 'UCCPL91HC',
        surname: 'Alisgandarov'
    }
];
