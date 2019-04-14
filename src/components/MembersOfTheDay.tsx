import { sortBy } from 'lodash';
import * as React from 'react';
import { Header, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { Provider } from '../enums';
import { ISquad } from '../models';
import { IScheduleService } from '../services/schedule/models';
import { getCurrentDate } from '../utils';
import { MemberLink } from './MemberLink';
import { MemberView } from './MemberView';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    squads: ISquad[];
    scheduleService: IScheduleService;
}

export const MembersOfTheDay: React.SFC<IProps> = ({ squads, scheduleService }) => {
    const today = getCurrentDate().startOf('day');
    const members = sortBy(squads, (squad) => squad.name)
        .map((squad) => scheduleService.getSchedule(squad.members, today)[0].member);

    return members.length
        ? (
            <ThemeConsumer>
                {({ darkTheme }) => (
                    <Table
                        inverted={darkTheme}
                        celled
                        columns={(members.length + 1) as any}
                        color={darkTheme ? 'black' : 'green'}
                    >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h3" inverted={darkTheme}>
                                        <Header.Content>
                                            Today
                                        <Header.Subheader>
                                                {today.format(UI_DATE_FORMAT)}
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                {
                                    members.map(
                                        (member) => (
                                            <Table.Cell key={member.slackId} selectable>
                                                <MemberLink
                                                    member={member}
                                                    provider={Provider.Slack}
                                                >
                                                    <MemberView
                                                        member={member}
                                                        todayMode={true}
                                                    />
                                                </MemberLink>
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
