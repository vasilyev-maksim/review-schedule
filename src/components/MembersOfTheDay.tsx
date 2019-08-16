import * as React from 'react';
import { Header, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { Provider } from '../enums';
import { IMember } from '../models';
import { getCurrentDate } from '../utils';
import { MemberLink } from './MemberLink';
import { MemberView } from './MemberView';
import { themeContext } from './ThemeContext';

interface IProps {
    members: Array<IMember | null>;
}

export const MembersOfTheDay: React.SFC<IProps> = ({ members }) => {
    const { darkTheme } = React.useContext(themeContext);

    const today = getCurrentDate().startOf('day');

    return members.length
        ? (
            <Table
                inverted={darkTheme}
                celled
                columns={(members.length + 1) as any}
                color="green"
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
                        {members.map(
                            (member, i) => (
                                <Table.Cell key={member ? member.slackId : i} selectable>
                                    {member && (
                                        <MemberLink
                                            member={member}
                                            provider={Provider.Slack}
                                        >
                                            <MemberView
                                                member={member}
                                                todayMode={true}
                                            />
                                        </MemberLink>
                                    )}
                                </Table.Cell>
                            )
                        )}
                    </Table.Row>
                </Table.Body>
            </Table>
        )
        : null;
};
