import { sortBy } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Icon, Table } from 'semantic-ui-react';

import { getReviewSchedule } from '../getReviewSchedule';
import { ISquad } from '../models';
import { Reviewer } from './Reviewer';

interface IProps {
    squads: ISquad[];
}

export const ReviewScheduleTable: React.SFC<IProps> = ({ squads }) => {
    const schedule = squads
        ? getReviewSchedule(squads)
        : [];
    const _squads = schedule.length
        ? schedule[0].reviewers.map((reviewer) => reviewer.squad)
        : [];

    return (
        <Table celled columns={(_squads.length + 1) as any}>
            <Table.Header>
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
                            reviewers.map((squadReviewer) => (
                                <Table.Cell key={squadReviewer.squad.name}>
                                    <Reviewer reviewer={squadReviewer.reviewer} />
                                </Table.Cell>
                            ))
                        }
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
