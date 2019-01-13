import { range } from 'lodash';
import * as React from 'react';
import { Icon, Placeholder, Table } from 'semantic-ui-react';

import { DATE_FORMAT, PLACEHOLDER_SQUADS_COUNT } from '../consts';
import { getCurrentDate, getWorkDaysRange } from '../utils';
import { ScheduleTableFilter } from './ScheduleTableFilter';

export const ScheduleTablePlaceholder: React.SFC = () => {
    const start = getCurrentDate().startOf('month');
    const end = getCurrentDate().endOf('month');
    const days = getWorkDaysRange(start, end);
    const squadsRange = range(0, PLACEHOLDER_SQUADS_COUNT);

    return (
        <>
            <ScheduleTableFilter />
            <Table
                celled
                columns={(PLACEHOLDER_SQUADS_COUNT + 1) as any}
            >
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
                    {
                        days.map((day, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>
                                    {day.format(DATE_FORMAT)}
                                </Table.Cell>
                                {
                                    squadsRange.map((_, j) => (
                                        <Table.Cell key={j}>
                                            <Placeholder>
                                                <Placeholder.Header as="h5" image>
                                                    <Placeholder.Line />
                                                    <Placeholder.Line />
                                                </Placeholder.Header>
                                            </Placeholder>
                                        </Table.Cell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </>
    );
};
