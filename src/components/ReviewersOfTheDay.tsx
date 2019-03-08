import * as React from 'react';
import { Header, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { Provider } from '../enums';
import { ISchedule } from '../models';
import { isToday } from '../utils';
import { Reviewer } from './Reviewer';
import { ReviewerLink } from './ReviewerLink';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    schedule: ISchedule;
}

export const ReviewersOfTheDay: React.SFC<IProps> = ({ schedule }) => {
    const today = schedule.find(({ day }) => isToday(day));
    return today
        ? (
            <ThemeConsumer>
                {({ darkTheme }) => (
                    <Table
                        inverted={darkTheme}
                        celled
                        columns={(today.reviewers.length + 1) as any}
                        color={darkTheme ? 'black' : 'green'}
                    >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h3" inverted={darkTheme}>
                                        <Header.Content>
                                            Today
                                        <Header.Subheader>
                                                {today.day.format(UI_DATE_FORMAT)}
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                {
                                    today.reviewers.map(
                                        ({ reviewer }) => (
                                            <Table.Cell key={reviewer.slackId} selectable>
                                                <ReviewerLink
                                                    reviewer={reviewer}
                                                    provider={Provider.Slack}
                                                >
                                                    <Reviewer
                                                        reviewer={reviewer}
                                                        todayMode={true}
                                                    />
                                                </ReviewerLink>
                                            </Table.Cell>
                                        )
                                    )
                                }
                            </Table.Row>
                        </Table.Body>
                    </Table>
                )}
            </ThemeConsumer>
        )
        : null;
};
