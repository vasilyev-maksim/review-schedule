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
import { CurrentCampProvider } from './CurrentCampProvider';
import { MembersOfTheDay } from './MembersOfTheDay';
import { MembersOfTheDayPlaceholder } from './MembersOfTheDayPlaceholder';
import { ScheduleTable } from './ScheduleTable';
import { ScheduleTableFilter } from './ScheduleTableFilter';
import { ScheduleTablePlaceholder } from './ScheduleTablePlaceholder';
import { WeekendMessage } from './WeekendMessage';

interface IProps {
    camps: ICamp[] | null;
    loading: boolean;
    scheduleService: IScheduleService;
    url: string;
}

interface IState {
    filteredBy: IMember | null;
}

export class SchedulePage extends React.Component<IProps, IState> {
    public state: IState = {
        filteredBy: null,
    };

    private handleMemberClick = (member: IMember): void => {
        this.setState({ filteredBy: member });
    }

    private handleFilterClear = () => {
        this.setState({ filteredBy: null });
    }

    private generateData = (squads: ISquad[]): {
        schedule: IScheduleDay[],
        sortedSquads: ISquad[],
        membersOfTheDay: Array<IMember | null> | null
    } => {
        const { scheduleService } = this.props;
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
                (
                    !this.state.filteredBy ||
                    members.some((member) => member === this.state.filteredBy)
                )
            );

        return {
            membersOfTheDay,
            schedule,
            sortedSquads,
        };
    }

    public render (): JSX.Element {
        const { camps, loading, url } = this.props;

        if (loading) {
            return (
                <>
                    <MembersOfTheDayPlaceholder />
                    <ScheduleTableFilter />
                    <ScheduleTablePlaceholder />
                </>
            );
        } else {
            return (
                <CurrentCampProvider camps={camps} url={url}>
                    {(currentCamp) => {
                        const squads = currentCamp && currentCamp.squads || [];
                        const { membersOfTheDay, schedule, sortedSquads } = this.generateData(squads);

                        return (
                            <>
                                {membersOfTheDay
                                    ? <MembersOfTheDay members={membersOfTheDay} />
                                    : <WeekendMessage />
                                }

                                <div style={{ textAlign: 'right' }}>
                                    <ScheduleTableFilter
                                        memeber={this.state.filteredBy}
                                        onClear={this.handleFilterClear}
                                    />
                                </div>

                                <ScheduleTable
                                    squads={sortedSquads}
                                    schedule={schedule}
                                    handleMemberClick={this.handleMemberClick}
                                />
                            </>
                        );
                    }}
                </ CurrentCampProvider>
            );
        }
    }
}
