import { SLACK_TEAM_ID } from '../config';
import { IMember } from '../models';
import { ILink, IProvider } from './models';

export const slackProvider: IProvider = {
    getLink (member: IMember): ILink {
        return {
            href: `slack://user?team=${SLACK_TEAM_ID}&id=${member.slackId}`,
            target: '_self'
        };
    }
};
