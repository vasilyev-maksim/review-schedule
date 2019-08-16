import { sortBy } from 'lodash';
import * as React from 'react';

import {
    ICamp,
    IMember,
    IScheduleDay,
    ISquad,
} from '../models';
import { IScheduleService } from '../services/schedule/models';
import { getCurrentDate } from '../utils';
import { MembersOfTheDay } from './MembersOfTheDay';
import { ScheduleTable } from './ScheduleTable';
import { ScheduleTableFilter } from './ScheduleTableFilter';
import { WeekendMessage } from './WeekendMessage';

interface IProps {
    scheduleService: IScheduleService;
    camp: ICamp;
}

export const SchedulePageView: React.FC<IProps> = ({ camp: { squads }, scheduleService }) => {
    const {
        clearFilter,
        filter,
        setFilter,
    } = useMemberFilter();
    const {
        membersOfTheDay,
        schedule,
        sortedSquads,
    } = useSchedule(scheduleService, squads, filter);

    return (
        <>
            {membersOfTheDay
                ? <MembersOfTheDay members={membersOfTheDay} />
                : <WeekendMessage />
            }

            <div style={{ textAlign: 'right' }}>
                <ScheduleTableFilter
                    memeber={filter}
                    onClear={clearFilter}
                />
            </div>

            <ScheduleTable
                squads={sortedSquads}
                schedule={schedule}
                handleMemberClick={setFilter}
            />
        </>
    );
};

function useMemberFilter (): {
    filter: IMember | null,
    clearFilter: () => void,
    setFilter: (member: IMember) => void,
} {
    const [filter, setFilter] = React.useState<IMember | null>(null);
    const clearFilter = React.useCallback(() => setFilter(null), []);

    return {
        clearFilter,
        filter,
        setFilter,
    };
}

function useSchedule (scheduleService: IScheduleService, squads: ISquad[], filter: IMember | null): {
    membersOfTheDay: Array<IMember | null> | null,
    schedule: IScheduleDay[],
    sortedSquads: ISquad[],
} {
    return React.useMemo(
        () => {
            const start = getCurrentDate().startOf('month');
            const end = getCurrentDate().endOf('month');
            const today = getCurrentDate().startOf('day');

            const sortedSquads = sortBy(squads, (squad) => squad.name);
            const squadSchedules = sortedSquads.map((squad) =>
                scheduleService.getSchedule(squad.members, start, end)
            );

            const rawSchedule = scheduleService.getDaysRange(start, end)
                .map((day) => {
                    const members = squadSchedules.map((squadSchedule) => {
                        const scheduleDay = squadSchedule.find(_scheduleDay => _scheduleDay.day.isSame(day));
                        return scheduleDay && scheduleDay.members && scheduleDay.members.length > 0
                            ? scheduleDay.members[0]
                            : null;
                    });
                    return { day, members };
                });

            const temp = rawSchedule.find(({ day }) => day.isSame(today));
            const membersOfTheDay = temp ? temp.members : null;

            const schedule = rawSchedule
                .filter(({ members }) =>
                    // do not show day with no members at all
                    members.filter(Boolean).length !== 0 &&
                    // filtration by concrete member
                    !filter || members.some((member) => member === filter)
                );

            return {
                membersOfTheDay,
                schedule,
                sortedSquads,
            };
        },
        [squads, scheduleService, filter]
    );
}
