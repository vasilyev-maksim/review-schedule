import * as Moment from 'moment';
import { SemanticICONS } from 'semantic-ui-react';

export enum ESquadName {
    DailyBanking = 'DailyBanking',
    Factoring = 'Factoring',
    Onboarding = 'Onboarding',
}

export interface IReviewDay {
    day: Moment.Moment;
    reviewers: {
        [ESquadName.DailyBanking]: IReviewer;
        [ESquadName.Factoring]: IReviewer;
        [ESquadName.Onboarding]: IReviewer;
    }
}

export interface ISquad {
    name: ESquadName;
    members: IReviewer[];
    icon: SemanticICONS;
}

export interface IReviewer {
    name: string;
    surname: string;
    photo: string;
}
