import { range } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Icon, Placeholder, Table } from 'semantic-ui-react';

import { getWorkDaysRange } from '../utils';
import { ReviewScheduleTableFilter } from './ReviewScheduleTableFilter';

export const ReviewScheduleTablePlaceholder: React.SFC = () => {
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const days = getWorkDaysRange(start, end);
    const squadsCount = 3;
    const squadsRange = range(0, squadsCount);

    return (
        <>
            <ReviewScheduleTableFilter />
            <Table celled columns={(squadsCount + 1) as any}>
                <Table.Header className="mobile hidden">
                    <Table.Row>
                        <Table.HeaderCell>
                            <Icon name="calendar alternate outline" /> Date
                        </Table.HeaderCell>
                        {
                            squadsRange.map((_, i) => (
                                <Table.HeaderCell key={i}>
                                    <Icon name="users" /> Squad #{i + 1}
                                </Table.HeaderCell>
                            ))
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {days.map((day, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>
                                {day.format('DD MMM YYYY')}
                            </Table.Cell>
                            {
                                squadsRange.map((_, j) => (
                                    <Table.Cell key={j}>
                                        <Placeholder>
                                            <Placeholder.Header image>
                                                <Placeholder.Line />
                                                <Placeholder.Line />
                                            </Placeholder.Header>
                                        </Placeholder>
                                    </Table.Cell>
                                ))
                            }
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};
