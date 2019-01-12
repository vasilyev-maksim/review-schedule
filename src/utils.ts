import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function getWorkDaysRange (start: Moment.Moment, end: Moment.Moment): Moment.Moment[] {
    const days = moment.range(start, end);
    const workingDays = Array.from(days.by('day')).filter(
        (day) => day.isoWeekday() !== 6 && day.isoWeekday() !== 7
    );
    return workingDays;
}
