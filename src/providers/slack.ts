import { IReviewer } from '../models';
import { ILink, IProvider } from './models';

export const SLACK_TEAM_ID = 'T9QT65P9R';

export const slack: IProvider = {
    getLink (reviewer: IReviewer): ILink {
        return {
            href: `slack://user?team=${SLACK_TEAM_ID}&id=${reviewer.slackId}`,
            target: '_self'
        };
    }
};
