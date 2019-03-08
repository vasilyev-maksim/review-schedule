import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { ThemeConsumer } from './ThemeContext';

export const WeekendMessage: React.SFC = () => {
    return (
        <ThemeConsumer>
            {({ darkTheme }) => (
                <Header
                    as="h1"
                    icon
                    textAlign="center"
                    color={darkTheme ? 'orange' : 'violet'}
                >
                    <Icon
                        name="gamepad"
                        color={darkTheme ? 'yellow' : 'purple'}
                    />
                    <Header.Content>Enjoy your weekends!</Header.Content>
                </Header>
            )}
        </ThemeConsumer>
    );
};
