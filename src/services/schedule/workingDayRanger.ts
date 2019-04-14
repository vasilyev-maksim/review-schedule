import { extendMoment } from 'moment-range';

import { IScheduleDayRanger } from './models';

import Moment = require('moment');

const moment = extendMoment(Moment);

class WorkingDayRanger implements IScheduleDayRanger {
    public getDaysRange (start: Moment.Moment, end?: Moment.Moment | undefined): Moment.Moment[] {
        const days = moment.range(start, end || start);
        const workingDays = Array.from(days.by('day'))
            .filter(WorkingDayRanger.isWorkingDay);
        return workingDays;
    }

    private static isWorkingDay (day: Moment.Moment): boolean {
        return day.isoWeekday() !== 6 && day.isoWeekday() !== 7;
    }
}

export const workingDayRanger = new WorkingDayRanger();
