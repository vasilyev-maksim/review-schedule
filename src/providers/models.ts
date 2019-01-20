import { IReviewer } from '../models';

export interface ILink {
    href: string;
    target: string;
}

export interface IProvider {
    getLink (reviewer: IReviewer): ILink;
}
