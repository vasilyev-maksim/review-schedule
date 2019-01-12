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
    const _squads = squads
        ? sortBy(squads, 'name')
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
                {schedule.map((day) => (
                    <Table.Row negative={day.day.isSame((moment()), 'day')} key={day.day.unix()}>
                        <Table.Cell>
                            {day.day.format('DD MMM YYYY')}
                        </Table.Cell>
                        {
                            _squads.map((squad) => (
                                <Table.Cell key={squad.name}>
                                    <Reviewer reviewer={day.reviewers[squad.name]} />
                                </Table.Cell>
                            ))
                        }
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
