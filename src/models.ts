import Moment from 'moment';
import { SemanticICONS } from 'semantic-ui-react';

export interface IReviewer {
    id: string;
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

export type ISchedule = IReviewDay[];

export interface ICamp {
    name: string;
    icon: SemanticICONS;
    squads: ISquad[];
}
