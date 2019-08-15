import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import { themeContext } from './ThemeContext';

export const ThemeSwitch: React.SFC = () => {
    const { darkTheme, toggleDarkTheme } = React.useContext(themeContext);

    return (
        <Menu
            inverted={darkTheme}
            compact
        >
            <Menu.Item onClick={toggleDarkTheme}>
                <Icon fitted name={darkTheme ? 'sun' : 'moon'} />
            </Menu.Item>
        </Menu>
    );
};
