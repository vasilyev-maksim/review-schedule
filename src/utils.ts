import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function getWorkDaysRange (start: Moment.Moment, end: Moment.Moment): Moment.Moment[] {
    const days = moment.range(start, end);
    const workingDays = Array.from(days.by('day')).filter(isWorkingDay);
    return workingDays;
}

export function getCurrentDate (): Moment.Moment {
    return moment();
}

export function isWorkingDay (day: Moment.Moment): boolean {
    return day.isoWeekday() !== 6 && day.isoWeekday() !== 7;
}

export function isToday (date: Moment.Moment): boolean {
    return date.isSame(getCurrentDate(), 'day');
}
