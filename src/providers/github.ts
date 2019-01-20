import { IReviewer } from '../models';
import { ILink, IProvider } from './models';

export const github: IProvider = {
    getLink (reviewer: IReviewer): ILink {
        return {
            href: `https://github.com/${reviewer.githubUsername}`,
            target: '_target'
        };
    }
};
