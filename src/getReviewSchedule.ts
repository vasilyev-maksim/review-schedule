import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { REFERENCE_POINT } from './consts';
import {
    ESquadName,
    IReviewDay,
    IReviewer,
    ISquad
} from './models';
import { getWorkDaysRange } from './utils';

const moment = extendMoment(Moment);

export function getReviewSchedule (squads: ISquad[]): IReviewDay[] {
    const start = moment().startOf('month');
    const end = moment().endOf('month');

    const days = getWorkDaysRange(REFERENCE_POINT, end);

    function getCurrentReviewer (squadName: ESquadName, dayNumber: number): IReviewer {
        const squad = squads.find((s) => s.name === squadName);
        const enabledMembers = squad.members.filter((member) => member.enabled);

        return enabledMembers[dayNumber % enabledMembers.length];
    }

    return days.map((day, i) => {
        if (day >= start) {
            return {
                day,
                reviewers: {
                    [ESquadName.DailyBanking]: getCurrentReviewer(ESquadName.DailyBanking, i),
                    [ESquadName.Factoring]: getCurrentReviewer(ESquadName.Factoring, i),
                    [ESquadName.Onboarding]: getCurrentReviewer(ESquadName.Onboarding, i),
                },
            };
        }
    })
        .filter(Boolean);
}
