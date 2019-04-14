import { IMember } from '../models';

export interface ILink {
    href: string;
    target: string;
}

export interface IProvider {
    getLink (member: IMember): ILink;
}
