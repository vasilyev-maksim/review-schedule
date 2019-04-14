import { sortBy } from 'lodash';
import * as React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { IMember, ISquad } from '../models';
import { IScheduleService } from '../services/schedule/models';
import { getCurrentDate, isToday } from '../utils';
import { MemberView } from './MemberView';
import { ScheduleTableFilter } from './ScheduleTableFilter';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    squads: ISquad[];
    scheduleService: IScheduleService;
}

interface IState {
    filteredBy: IMember | null;
}

export class ScheduleTable extends React.Component<IProps, IState> {
    public state: IState = {
        filteredBy: null,
    };

    private handleMemberClick = (member: IMember): void => {
        this.setState({ filteredBy: member });
    }

    private handleFilterClear = () => {
        this.setState({ filteredBy: null });
    }

    private generateSchedule = (squads: ISquad[]) => {
        const { scheduleService } = this.props;
        const start = getCurrentDate().startOf('month');
        const end = getCurrentDate().endOf('month');

        const squadSchedules = squads.map((squad) =>
            scheduleService.getSchedule(squad.members, start, end)
        );

        const schedule = scheduleService.getDaysRange(start, end)
            .map((day) => {
                const members = squadSchedules.map((squadSchedule) => {
                    const scheduleDay = squadSchedule.find(_scheduleDay => _scheduleDay.day.isSame(day));
                    return scheduleDay ? scheduleDay.member : null;
                });
                return { day, members };
            })
            .filter(({ members }) =>
                // do not show day with no members at all
                members.filter(Boolean).length !== 0 &&
                // filtration by concrete member
                (
                    !this.state.filteredBy ||
                    members.some((member) => member === this.state.filteredBy)
                )
            );

        return schedule;
    }

    public render (): JSX.Element {
        const sortedSquads = sortBy(this.props.squads, (squad) => squad.name);
        const schedule = this.generateSchedule(sortedSquads);

        return (
            <>
                <div style={{ textAlign: 'right' }}>
                    <ScheduleTableFilter
                        memeber={this.state.filteredBy}
                        onClear={this.handleFilterClear}
                    />
                </div>

                <ThemeConsumer>
                    {({ darkTheme }) => (
                        <Table
                            celled
                            columns={(sortedSquads.length + 1) as any}
                            inverted={darkTheme}
                        >
                            <Table.Header className="mobile hidden">
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Icon name="calendar alternate outline" /> Date
                                </Table.HeaderCell>
                                    {
                                        sortedSquads.map((squad) => (
                                            <Table.HeaderCell key={squad.name}>
                                                <Icon name={squad.icon} /> {squad.name}
                                            </Table.HeaderCell>
                                        ))
                                    }
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    schedule.map(
                                        ({ day, members }) => (
                                            <Table.Row
                                                positive={!darkTheme && isToday(day)}
                                                key={day.unix()}
                                            >
                                                <Table.Cell>
                                                    {
                                                        isToday(day)
                                                            ? (
                                                                <Label color="green" ribbon>
                                                                    {day.format(UI_DATE_FORMAT)}
                                                                </Label>
                                                            )
                                                            : day.format(UI_DATE_FORMAT)
                                                    }
                                                </Table.Cell>
                                                {
                                                    members.map(
                                                        (member, i) => (
                                                            <Table.Cell key={member ? member.slackId : i} selectable>
                                                                {member && (
                                                                    <a href="#" onClick={() => this.handleMemberClick(member)}>
                                                                        <MemberView member={member} />
                                                                    </a>
                                                                )}
                                                            </Table.Cell>
                                                        )
                                                    )
                                                }
                                            </Table.Row>
                                        )
                                    )
                                }
                            </Table.Body>
                        </Table>
                    )}
                </ThemeConsumer>
            </>
        );
    }
}
