import { range } from 'lodash';
import { extendMoment } from 'moment-range';
import * as React from 'react';
import { Icon, Placeholder, Table } from 'semantic-ui-react';

import { PLACEHOLDER_SQUADS_COUNT, UI_DATE_FORMAT } from '../config';
import { getCurrentDate } from '../utils';
import { themeContext } from './ThemeContext';

import Moment = require('moment');

const moment = extendMoment(Moment);

export const ScheduleTablePlaceholder: React.SFC = () => {
    const { darkTheme } = React.useContext(themeContext);

    const start = getCurrentDate().startOf('month');
    const end = getCurrentDate().endOf('month');
    const daysRange = Array.from(moment.range(start, end || start).by('day'));
    const squadsRange = range(0, PLACEHOLDER_SQUADS_COUNT);

    return (
        <Table
            inverted={darkTheme}
            celled
            columns={(PLACEHOLDER_SQUADS_COUNT + 1) as any}
        >
            <Table.Header className="mobile hidden">
                <Table.Row>
                    <Table.HeaderCell>
                        <Icon name="calendar alternate outline" /> Date
                                </Table.HeaderCell>
                    {squadsRange.map((_, i) => (
                        <Table.HeaderCell key={i}>
                            <Icon name="users" /> Squad #{i + 1}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {daysRange.map((day, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>
                            {day.format(UI_DATE_FORMAT)}
                        </Table.Cell>

                        {squadsRange.map((_, j) => (
                            <Table.Cell key={j}>
                                <Placeholder inverted={darkTheme}>
                                    <Placeholder.Header as="h5" image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                </Placeholder>
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
