import { extendMoment } from 'moment-range';

import { IScheduleDayRanger } from './models';

import Moment = require('moment');

const moment = extendMoment(Moment);

class EachDayRanger implements IScheduleDayRanger {
    public getDaysRange (start: Moment.Moment, end?: Moment.Moment | undefined): Moment.Moment[] {
        return Array.from(moment.range(start, end || start).by('day'));
    }
}

export const eachDayRanger = new EachDayRanger();
