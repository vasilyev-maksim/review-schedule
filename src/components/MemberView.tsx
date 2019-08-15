import React from 'react';
import { Header, Icon, Image } from 'semantic-ui-react';

import { IMember } from '../models';
import { themeContext } from './ThemeContext';

interface IProps {
    member: IMember;
    todayMode?: boolean;
}

export const MemberView: React.SFC<IProps> = ({ member, todayMode }) => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <div className="member">
            <div className="body">
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
            </div>
            <div className="actions">
                {todayMode
                    ? <Icon name="slack" disabled size="large" />
                    : <Icon name="thumbtack" disabled />
                }
            </div>
        </div >
    );
};
