import { range } from 'lodash';
import * as React from 'react';
import { Header, Placeholder, Table } from 'semantic-ui-react';

import { DATE_FORMAT, PLACEHOLDER_SQUADS_COUNT } from '../consts';
import { getCurrentDate } from '../utils';

export const ReviewersOfTheDayPlaceholder: React.SFC = () => {
    const today = getCurrentDate();
    const squadsRange = range(0, PLACEHOLDER_SQUADS_COUNT);

    return (
        <Table
            celled
            columns={(PLACEHOLDER_SQUADS_COUNT + 1) as any}
            color="green"
        >
            <Table.Body>
                <Table.Row positive>
                    <Table.Cell>
                        <Header as="h3">
                            <Header.Content>
                                Today
                                <Header.Subheader>
                                    {today.format(DATE_FORMAT)}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
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
            </Table.Body>
        </Table>
    );
};
