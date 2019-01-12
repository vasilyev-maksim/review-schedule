import { sortBy } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Icon, Table } from 'semantic-ui-react';

import { getReviewSchedule } from '../getReviewSchedule';
import { IReviewer, ISquad } from '../models';
import { Reviewer } from './Reviewer';
import { ReviewScheduleTableFilter } from './ReviewScheduleTableFilter';

interface IProps {
    squads: ISquad[];
}

interface IState {
    filteredBy: IReviewer;
}

export class ReviewScheduleTable extends React.Component<IProps, IState> {
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
        const { squads } = this.props;

        const schedule = squads
            ? getReviewSchedule(squads).filter(
                (day) => (
                    !this.state.filteredBy ||
                    day.reviewers.some(
                        ({ reviewer }) => reviewer === this.state.filteredBy
                    )
                )
            )
            : [];
        const _squads = schedule.length
            ? schedule[0].reviewers.map((reviewer) => reviewer.squad)
            : [];

        return (
            <>
                <div style={{ textAlign: 'right' }}>
                    <ReviewScheduleTableFilter
                        reviewer={this.state.filteredBy}
                        onClear={this.handleFilterClear}
                    />
                </div>

                <Table celled columns={(_squads.length + 1) as any}>
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
                        {schedule.map(({ day, reviewers }) => (
                            <Table.Row
                                negative={day.isSame((moment()), 'day')}
                                key={day.unix()}
                            >
                                <Table.Cell>
                                    {day.format('DD MMM YYYY')}
                                </Table.Cell>
                                {
                                    reviewers.map(({ squad, reviewer }) => (
                                        <Table.Cell key={squad.name} selectable>
                                            <a href="#" onClick={() => this.handleReviewerClick(reviewer)}>
                                                <Reviewer reviewer={reviewer} />
                                            </a>
                                        </Table.Cell>
                                    ))
                                }
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </>
        );
    }
}
