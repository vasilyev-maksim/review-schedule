import { sortBy } from 'lodash';

import { REFERENCE_POINT } from './consts';
import { IReviewSchedule, ISquad, ISquadReviewer } from './models';
import { getCurrentDate, getWorkDaysRange } from './utils';

export function getReviewSchedule (squads: ISquad[]): IReviewSchedule {
    const start = getCurrentDate().startOf('month');
    const end = getCurrentDate().endOf('month');

    const days = getWorkDaysRange(REFERENCE_POINT, end);

    function getReviewer (squad: ISquad, dayNumber: number): ISquadReviewer {
        const enabledMembers = squad.members.filter((member) => member.enabled);
        const reviewer = enabledMembers[dayNumber % enabledMembers.length];
        return { reviewer, squad };
    }

    return days.map((day, i) => {
        if (day >= start) {
            const reviewers = sortBy(
                squads.map((squad) => getReviewer(squad, i)),
                (r) => r.squad.name
            );

            return {
                day,
                reviewers,
            };
        }
    }).filter(Boolean);
}
