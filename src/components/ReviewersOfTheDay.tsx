import * as React from 'react';
import { Header, Image, Table } from 'semantic-ui-react';

import { IReviewSchedule } from '../models';
import { isToday } from '../utils';

interface IProps {
    schedule: IReviewSchedule;
}

export const ReviewersOfTheDay: React.SFC<IProps> = ({ schedule }) => {
    const today = schedule.find(({ day }) => isToday(day));

    return today
        ? (
            <Table
                celled
                columns={(today.reviewers.length + 1) as any}
                color="green"
            >
                <Table.Body>
                    <Table.Row positive>
                        <Table.Cell>
                            <Header as="h3">
                                <Header.Content>
                                    Today
                                    <Header.Subheader>
                                        {today.day.format('DD MMM YYYY')}
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        {
                            today.reviewers.map(
                                ({ reviewer }) => (
                                    <Table.Cell key={reviewer.name + reviewer.surname}>
                                        {/* // TODO: add `username`to model and use as a key */}
                                        <Header as="h3" image>
                                            <Image src={reviewer.photo} rounded size="large" />
                                            <Header.Content>
                                                {reviewer.name}
                                                <Header.Subheader>
                                                    {reviewer.surname}
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                )
                            )
                        }
                    </Table.Row>
                </Table.Body>
            </Table>
        )
        : null;
};
