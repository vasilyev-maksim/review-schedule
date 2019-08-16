import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { themeContext } from './ThemeContext';

export const WeekendMessage: React.SFC = () => {
    const { darkTheme } = React.useContext(themeContext);

    return (
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
    );
};
