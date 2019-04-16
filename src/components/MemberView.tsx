import React from 'react';
import { Header, Icon, Image } from 'semantic-ui-react';

import { IMember } from '../models';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    member: IMember;
    todayMode?: boolean;
}

export const MemberView: React.SFC<IProps> = ({ member, todayMode }) => (
    <div className="member">
        <div className="body">
            <ThemeConsumer>
                {({ darkTheme }) => (
                    <Header
                        as={todayMode ? 'h3' : 'h4'}
                        image
                        inverted={darkTheme}
                    >
                        <Image
                            src={member.photo}
                            rounded
                            size={todayMode ? 'large' : 'mini'}
                        />
                        <Header.Content>
                            {member.name}
                            <Header.Subheader>
                                {member.surname}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                )}
            </ThemeConsumer>
        </div>
        <div className="actions">
            {todayMode
                ? <Icon name="slack" disabled size="large" />
                : <Icon name="thumbtack" disabled />
            }
        </div>
    </div>
);
