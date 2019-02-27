import { IReviewer } from './models';

export const REFERENCE_POINT = '2019-01-09';
export const UI_DATE_FORMAT = 'DD MMM YYYY - dddd';
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const PLACEHOLDER_SQUADS_COUNT = 3;

export const SLACK_TEAM_ID = 'T9QT65P9R';

export const SELECTED_CAMP_COOKIE_KEY = 'reviewer-camp';
export const AUTHORS: IReviewer[] = [
    {
        githubId: '42234410',
        githubUsername: 'maksim-vasilyev-pb',
        name: 'Maksim',
        photo: 'https://avatars.slack-edge.com/2019-01-14/524236277942_72daa0025e21d24edd51_48.jpg',
        slackId: 'UFCM8BWUT',
        surname: 'Vasilyev'
    },
    {
        githubId: '42533732',
        githubUsername: 'jamil-alisgandarov',
        name: 'Jamil',
        photo: 'https://avatars.slack-edge.com/2018-08-28/424478790436_0d47862072655452f619_48.jpg',
        slackId: 'UCCPL91HC',
        surname: 'Alisgandarov'
    }
];
