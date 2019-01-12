import { sortBy } from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { REFERENCE_POINT } from './consts';
import { IReviewDay, ISquad, ISquadReviewer } from './models';
import { getWorkDaysRange } from './utils';

const moment = extendMoment(Moment);

export function getReviewSchedule (squads: ISquad[]): IReviewDay[] {
    const start = moment().startOf('month');
    const end = moment().endOf('month');

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
