import { IMember } from '../models';
import { ILink, IProvider } from './models';

export const githubProvider: IProvider = {
    getLink (member: IMember): ILink {
        return {
            href: `https://github.com/${member.githubUsername}`,
            target: '_target'
        };
    }
};
