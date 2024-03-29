import * as Cookies from 'js-cookie';
import { extendMoment } from 'moment-range';

import { SELECTED_CAMP_COOKIE_KEY } from './config';
import { getEnvironment } from './environment';
import { ICamp } from './models';

import Moment = require('moment');

const moment = extendMoment(Moment);

export function getCurrentDate (): Moment.Moment {
    const env = getEnvironment();
    return env.mockCurrentDate
        ? moment(env.mockCurrentDate)
        : moment();
}

export function isToday (date: Moment.Moment): boolean {
    return date.isSame(getCurrentDate(), 'day');
}

export function getSelectedCampFromCookies (): string | undefined {
    return Cookies.get(SELECTED_CAMP_COOKIE_KEY);
}

export function saveSelectedCampToCookies (camp: ICamp): void {
    Cookies.set(SELECTED_CAMP_COOKIE_KEY, camp.name);
}

export function getDefaultCampName (camps: ICamp[] | null | undefined): string | null {
    let defaultCampName: string | null = null;

    if (camps && camps.length) {
        const cookieCampName = getSelectedCampFromCookies();
        if (cookieCampName) {
            const cookieCamp = camps.some((camp) => camp.name === cookieCampName);
            if (cookieCamp) {
                defaultCampName = cookieCampName;
            }
        }

        if (!defaultCampName) {
            const firstCampName = camps[0].name;
            if (firstCampName) {
                defaultCampName = encodeURIComponent(firstCampName);
            }
        }
    }

    return defaultCampName;
}

export function findCampByName (camps: ICamp[] | null, currentCampName: any): ICamp | null {
    return camps && camps.find((camp) => encodeURIComponent(camp.name) === encodeURIComponent(currentCampName)) || null;
}
