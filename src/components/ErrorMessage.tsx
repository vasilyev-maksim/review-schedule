import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { Provider } from '../enums';
import { AuthorsList } from './AuthorsList';
import { themeContext } from './ThemeContext';

export const ErrorMessage: React.SFC = () => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <div style={{ textAlign: 'center' }}>
            <Header
                as="h1"
                icon
                textAlign="center"
                color="red"
            >
                <Icon name="bug" />
                Oooops... Shit happens!
            </Header>
            <br />
            <Header inverted={darkTheme}>
                Please contact <AuthorsList provider={Provider.Slack} /> as soon as possible.
            </Header>
        </div>
    );
};
