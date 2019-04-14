import moment from 'moment';

import { IMember } from '../../models';

export interface IScheduleService {
    getSchedule (members: IMember[], start: moment.Moment, end?: moment.Moment): IScheduleDay[];
    getDaysRange (start: moment.Moment, end?: moment.Moment): moment.Moment[];
}

/**
 * Generates sequence of members for specified days range.
 * IScheduleService implementations (may) use it internally.
 * Supposed to accept days range from IScheduleDayRanger implementations.
 */
export interface IScheduleSequencer {
    getSequence (
        members: IMember[],
        daysRange: moment.Moment[],
        isMemberActive: (member: IMember, day: moment.Moment) => boolean
    ): IScheduleDay[];
}

/**
 * Generates range of days. Schedule is generated based on this range.
 * IScheduleService implementations (may) use it internally.
 */
export interface IScheduleDayRanger {
    getDaysRange (start: moment.Moment, end?: moment.Moment): moment.Moment[];
}

/**
 * Determines whether member can be selected as responsible for particular schedule day.
 * For example, returns false if member is on vacation or is fired (or is not hired yet O_o).
 * In this case another member may be selected (for example, the next one in the sequence).
 * IScheduleSequencer implementations (may) use it internally.
 */
export interface IScheduleMemberFilter {
    isMemberActive (member: IMember, day: moment.Moment): boolean;
}

export interface IScheduleDay {
    day: moment.Moment;
    member: IMember;
}
