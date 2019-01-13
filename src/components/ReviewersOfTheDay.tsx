import * as React from 'react';
import { Header, Icon, Image, Table } from 'semantic-ui-react';

import { DATE_FORMAT, SLACK_TEAM_ID } from '../config';
import { ISchedule } from '../models';
import { isToday } from '../utils';
import { Reviewer } from './Reviewer';

interface IProps {
    schedule: ISchedule;
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
                                        {today.day.format(DATE_FORMAT)}
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        {
                            today.reviewers.map(
                                ({ reviewer }) => (
                                    <Table.Cell key={reviewer.id} selectable>
                                        <a href={`slack://user?team=${SLACK_TEAM_ID}&id=${reviewer.id}`}>
                                            <Reviewer reviewer={reviewer} todayMode={true} />
                                        </a>
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
