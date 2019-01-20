import Moment from 'moment';
import { SemanticICONS } from 'semantic-ui-react';

export interface IReviewer {
    enabled?: boolean;
    githubId: string;
    githubUsername: string;
    name: string;
    photo: string;
    slackId: string;
    surname: string;
}

export interface ISquad {
    icon: SemanticICONS;
    members: IReviewer[];
    name: string;
}

export interface ISquadReviewer {
    reviewer: IReviewer;
    squad: ISquad;
}

export interface IReviewDay {
    day: Moment.Moment;
    reviewers: ISquadReviewer[];
}

export type ISchedule = IReviewDay[];

export interface ICamp {
    icon: SemanticICONS;
    name: string;
    squads: ISquad[];
}
