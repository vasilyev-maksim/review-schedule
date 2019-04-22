import moment from 'moment';
import { SemanticICONS } from 'semantic-ui-react';

export interface IPeriod {
    start: string;
    end: string;
}

export interface IMember {
    githubId: string;
    githubUsername: string;
    name: string;
    photo: string;
    slackId: string;
    surname: string;
    /** When member was hired, for example. */
    enabledOn?: string;
    /** When memeber was fired, for exmaple :) */
    disabledOn?: string;
    /** Time periods when user was inactive (for example, was on vacation, had day off or was ill). */
    inactivityPeriods?: IPeriod[],
}

export interface ISquad {
    icon: SemanticICONS;
    members: IMember[];
    name: string;
}

export interface ICamp {
    icon: SemanticICONS;
    name: string;
    squads: ISquad[];
}

export interface IDBConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
}

export interface IScheduleDay {
    day: moment.Moment;
    members: Array<IMember | null>;
}
