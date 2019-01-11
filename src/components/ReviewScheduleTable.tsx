import * as React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import moment from 'moment';

import getReviewSchedule from '../getReviewSchedule';
import { backendSquads } from '../squads';
import { Reviewer } from './Reviewer';

const ReviewSchedule: React.SFC = () => {
    const schedule = getReviewSchedule(backendSquads);
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <Icon name="calendar alternate outline" /> Date
                    </Table.HeaderCell>
                    {
                        backendSquads.map((squad) => (
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
                            backendSquads.map((squad) => (
                                <Table.Cell key={squad.name + day.day.unix()}>
                                    <Reviewer reviewer={day.reviewers[squad.name]} />
                                </Table.Cell>
                            )
                        }
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default ReviewSchedule;
