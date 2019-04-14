import moment, { Moment } from 'moment';

import { SERVER_DATE_FORMAT } from '../../config';
import { IMember } from '../../models';
import { IScheduleMemberFilter } from './models';

class MemberSequencer implements IScheduleMemberFilter {
    public isMemberActive (member: IMember, day: moment.Moment): boolean {
        const isInactive = member.inactivityPeriods &&
            member.inactivityPeriods.some((period) =>
                day.isBetween(
                    MemberSequencer.parseDate(period.start),
                    MemberSequencer.parseDate(period.end),
                    'd',
                    '[]'
                )
            );
        const isNotEnabledYet = member.enabledOn && day.isBefore(MemberSequencer.parseDate(member.enabledOn));
        const isDisabled = member.disabledOn && day.isSameOrAfter(MemberSequencer.parseDate(member.disabledOn));

        return !(isInactive || isNotEnabledYet || isDisabled);
    }

    private static parseDate (str: string): Moment {
        return moment(str, SERVER_DATE_FORMAT);
    }
}

export const memberSequencer = new MemberSequencer();
