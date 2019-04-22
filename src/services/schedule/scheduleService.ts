import moment from 'moment';

import { IMember, IScheduleDay } from '../../models';
import {
    IScheduleDayRanger,
    IScheduleMemberFilter,
    IScheduleSequencer,
    IScheduleService,
} from './models';

export class ScheduleService implements IScheduleService {
    constructor (
        private _sequencer: IScheduleSequencer,
        private ranger: IScheduleDayRanger,
        private filter: IScheduleMemberFilter,
        private referencePoint: string,
    ) { }

    public getSchedule (members: IMember[], start: moment.Moment, end?: moment.Moment): IScheduleDay[] {
        const daysRange = this.getDaysRange(moment(this.referencePoint), end || start);

        const schedule = this._sequencer.getSequence(
            members,
            daysRange,
            this.filter.isMemberActive
        ).filter((scheduleDay) => scheduleDay.day.isSameOrAfter(start));

        return schedule;
    }

    public getDaysRange (start: moment.Moment, end: moment.Moment): moment.Moment[] {
        return this.ranger.getDaysRange(start, end);
    }
}
