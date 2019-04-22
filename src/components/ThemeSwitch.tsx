import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import { ThemeConsumer } from './ThemeContext';

export const ThemeSwitch: React.SFC = () => {
    return (
        <ThemeConsumer>
            {({ darkTheme, toggleDarkTheme }) => (
                <Menu
                    inverted={darkTheme}
                    compact
                >
                    <Menu.Item onClick={toggleDarkTheme}>
                        <Icon fitted name={darkTheme ? 'sun' : 'moon'} />
                    </Menu.Item>
                </Menu>
            )}
        </ThemeConsumer>
    );
};
