import moment from 'moment';

import { IMember } from '../../models';
import { IScheduleDay, IScheduleSequencer } from './models';

class Sequencer implements IScheduleSequencer {
    public getSequence (
        members: IMember[],
        daysRange: moment.Moment[],
        isMemberActive: (member: IMember, day: moment.Moment) => boolean
    ): IScheduleDay[] {
        const sequence = [];
        let iterationsCount = daysRange.length;
        let dayIndex = 0;

        for (let i = 0; i < iterationsCount; i++) {
            const member = members[i % members.length];
            const day = daysRange[dayIndex];

            if (isMemberActive(member, day)) {
                sequence.push({ day, member });
                dayIndex++;
            } else {
                iterationsCount++;
            }
        }

        return sequence;
    }
}

export const sequencer = new Sequencer();
