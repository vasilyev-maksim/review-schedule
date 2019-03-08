import * as React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { IReviewer, ISchedule } from '../models';
import { isToday } from '../utils';
import { Reviewer } from './Reviewer';
import { ScheduleTableFilter } from './ScheduleTableFilter';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    schedule: ISchedule;
}

interface IState {
    filteredBy: IReviewer | null;
}

export class ScheduleTable extends React.Component<IProps, IState> {
    public state: IState = {
        filteredBy: null,
    };

    private handleReviewerClick = (reviewer: IReviewer): void => {
        this.setState({ filteredBy: reviewer });
    }

    private handleFilterClear = () => {
        this.setState({ filteredBy: null });
    }

    public render (): JSX.Element {
        const { schedule } = this.props;

        const _schedule = schedule
            ? schedule.filter(
                (day) => (
                    !this.state.filteredBy ||
                    day.reviewers.some(
                        ({ reviewer }) => reviewer === this.state.filteredBy
                    )
                )
            )
            : [];
        const _squads = _schedule.length
            ? _schedule[0].reviewers.map((reviewer) => reviewer.squad)
            : [];

        return (
            <>
                <div style={{ textAlign: 'right' }}>
                    <ScheduleTableFilter
                        reviewer={this.state.filteredBy}
                        onClear={this.handleFilterClear}
                    />
                </div>

                <ThemeConsumer>
                    {({ darkTheme }) => (
                        <Table
                            celled
                            columns={(_squads.length + 1) as any}
                            inverted={darkTheme}
                        >
                            <Table.Header className="mobile hidden">
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Icon name="calendar alternate outline" /> Date
                                </Table.HeaderCell>
                                    {
                                        _squads.map((squad) => (
                                            <Table.HeaderCell key={squad.name}>
                                                <Icon name={squad.icon} /> {squad.name}
                                            </Table.HeaderCell>
                                        ))
                                    }
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    _schedule.map(
                                        ({ day, reviewers }) => (
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
                                                    reviewers.map(
                                                        ({ reviewer }) => (
                                                            <Table.Cell key={reviewer.slackId} selectable>
                                                                <a href="#" onClick={() => this.handleReviewerClick(reviewer)}>
                                                                    <Reviewer reviewer={reviewer} />
                                                                </a>
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
