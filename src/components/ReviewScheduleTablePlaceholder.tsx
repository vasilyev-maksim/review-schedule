import { range } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Icon, Placeholder, Table } from 'semantic-ui-react';

export const ReviewScheduleTablePlaceholder: React.SFC = () => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <Icon name="calendar alternate outline" /> Date
                    </Table.HeaderCell>
                    {
                        range(0, 3).map((_, i) => (
                            <Table.HeaderCell key={i}>
                                <Placeholder>
                                    <Placeholder.Line />
                                </Placeholder>
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
