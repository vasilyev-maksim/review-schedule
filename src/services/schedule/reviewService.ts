import moment from 'moment';

import { REVIEW_REFERENCE_POINT } from '../../config';
import { IMember } from '../../models';
import { memberSequencer } from './memberFilter';
import {
    IScheduleDay,
    IScheduleDayRanger,
    IScheduleMemberFilter,
    IScheduleSequencer,
    IScheduleService,
} from './models';
import { sequencer } from './sequencer';
import { workingDayRanger } from './workingDayRanger';

class ReviewService implements IScheduleService {
    constructor (
        private _sequencer: IScheduleSequencer,
        private ranger: IScheduleDayRanger,
        private filter: IScheduleMemberFilter,
    ) { }

    public getSchedule (members: IMember[], start: moment.Moment, end?: moment.Moment): IScheduleDay[] {
        const daysRange = this.getDaysRange(moment(REVIEW_REFERENCE_POINT), end || start);

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

export const reviewService = new ReviewService(sequencer, workingDayRanger, memberSequencer);
