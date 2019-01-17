
import * as Cookies from 'js-cookie';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

import { COOKIE_CAMP_NAME_KEY } from './consts';
import { ICamp } from './models';

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

export function getSelectedCampFromCookie (): string {
    return Cookies.get(COOKIE_CAMP_NAME_KEY);
}

export function setCampToCookie (camp: ICamp): void {
    Cookies.set(COOKIE_CAMP_NAME_KEY, camp.name);
}
