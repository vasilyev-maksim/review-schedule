import { sortBy } from 'lodash';
import moment from 'moment';

import { REFERENCE_POINT } from '../config';
import { ISchedule, ISquad, ISquadReviewer } from '../models';
import { getCurrentDate, getWorkDaysRange } from '../utils';

export const scheduleService = {
    generateSchedule (squads: ISquad[]): ISchedule {
        const start = getCurrentDate().startOf('month');
        const end = getCurrentDate().endOf('month');
        const days = getWorkDaysRange(moment(REFERENCE_POINT), end);
        const schedule = days.map((day, i) => {
            const reviewers = sortBy(
                squads.map((squad) => getReviewer(squad, i)),
                (r) => r.squad.name
            );

            return {
                day,
                reviewers,
            };
        }).filter((reviewDay) => reviewDay.day >= start);

        return schedule;
    }
};

function getReviewer (squad: ISquad, dayNumber: number): ISquadReviewer {
    const enabledMembers = squad.members.filter((member) => member.enabled);
    const reviewer = enabledMembers[dayNumber % enabledMembers.length];
    return { reviewer, squad };
}
