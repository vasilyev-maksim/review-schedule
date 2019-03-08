import { SLACK_TEAM_ID } from '../config';
import { IReviewer } from '../models';
import { ILink, IProvider } from './models';

export const slackProvider: IProvider = {
    getLink (reviewer: IReviewer): ILink {
        return {
            href: `slack://user?team=${SLACK_TEAM_ID}&id=${reviewer.slackId}`,
            target: '_self'
        };
    }
};
