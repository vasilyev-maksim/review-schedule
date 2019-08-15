import * as React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';

import { UI_DATE_FORMAT } from '../config';
import { IMember, IScheduleDay, ISquad } from '../models';
import { isToday } from '../utils';
import { MemberView } from './MemberView';
import { themeContext } from './ThemeContext';

interface IProps {
    squads: ISquad[];
    schedule: IScheduleDay[];
    handleMemberClick: (member: IMember) => void;
}

export const ScheduleTable: React.SFC<IProps> = ({ squads, schedule, handleMemberClick }) => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <Table
            celled
            columns={(squads.length + 1) as any}
            inverted={darkTheme}
        >
            <Table.Header className="mobile hidden">
                <Table.Row>
                    <Table.HeaderCell>
                        <Icon name="calendar alternate outline" /> Date
                            </Table.HeaderCell>
                    {squads.map((squad) => (
                        <Table.HeaderCell key={squad.name}>
                            <Icon name={squad.icon} /> {squad.name}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {schedule.map(
                    ({ day, members }) => (
                        <Table.Row
                            positive={!darkTheme && isToday(day)}
                            key={day.unix()}
                        >
                            <Table.Cell>
                                {isToday(day)
                                    ? (
                                        <Label color="green" ribbon>
                                            {day.format(UI_DATE_FORMAT)}
                                        </Label>
                                    )
                                    : day.format(UI_DATE_FORMAT)
                                }
                            </Table.Cell>
                            {members.map(
                                (member, i) => (
                                    <Table.Cell key={member ? member.slackId : i} selectable>
                                        {member && (
                                            <a href="#" onClick={() => handleMemberClick(member)}>
                                                <MemberView member={member} />
                                            </a>
                                        )}
                                    </Table.Cell>
                                )
                            )}
                        </Table.Row>
                    )
                )}
            </Table.Body>
        </Table>
    );
};
