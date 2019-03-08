import React from 'react';
import { Header, Icon, Image } from 'semantic-ui-react';

import { IReviewer } from '../models';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    reviewer: IReviewer;
    todayMode?: boolean;
}

export const Reviewer: React.SFC<IProps> = ({ reviewer, todayMode }) => (
    <div className="reviewer">
        <div className="body">
            <ThemeConsumer>
                {({ darkTheme }) => (
                    <Header
                        as={todayMode ? 'h3' : 'h4'}
                        image
                        inverted={darkTheme}
                    >
                        <Image
                            src={reviewer.photo}
                            rounded
                            size={todayMode ? 'large' : 'mini'}
                        />
                        <Header.Content>
                            {reviewer.name}
                            <Header.Subheader>
                                {reviewer.surname}
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
