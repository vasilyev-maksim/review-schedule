import * as Moment from 'moment';
import { SemanticICONS } from 'semantic-ui-react';

export interface IReviewer {
    enabled: boolean;
    name: string;
    surname: string;
    photo: string;
}

export interface ISquad {
    name: string;
    members: IReviewer[];
    icon: SemanticICONS;
}

export interface ISquadReviewer {
    squad: ISquad;
    reviewer: IReviewer;
}

export interface IReviewDay {
    day: Moment.Moment;
    reviewers: ISquadReviewer[];
}

export type IReviewSchedule = IReviewDay[];

export interface ICamp {
    name: string;
    squads: ISquad[];
}
