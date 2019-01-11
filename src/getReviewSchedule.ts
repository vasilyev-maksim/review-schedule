import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { ISquad, IReviewDay, ESquadName, IReviewer } from './models';

const moment = extendMoment(Moment);

export default function getReviewSchedule (squads: ISquad[]): IReviewDay[] {
    const referencePoint = moment('2019-01-11');
    const start = moment().startOf('month');
    const end = moment().endOf('month');

    const days = moment.range(referencePoint, end);
    const workingDays = Array.from(days.by('day'))
        .filter((day) => day.isoWeekday() !== 6 && day.isoWeekday() !== 7);

    function getCurrentReviewer (squadName: ESquadName, dayNumber: number): IReviewer {
        const squad = squads.find((s) => s.name === squadName);
        return squad.members[dayNumber % squad.members.length];
    }

    return workingDays
        .map((day, i) => {
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