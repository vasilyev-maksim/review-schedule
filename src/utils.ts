
import * as Cookies from 'js-cookie';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { SELECTED_CAMP_COOKIE_KEY } from './consts';
import { ICamp } from './models';

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

export function getSelectedCampFromCookies (): string {
    return Cookies.get(SELECTED_CAMP_COOKIE_KEY);
}

export function saveSelectedCampToCookies (camp: ICamp): void {
    Cookies.set(SELECTED_CAMP_COOKIE_KEY, camp.name);
}
