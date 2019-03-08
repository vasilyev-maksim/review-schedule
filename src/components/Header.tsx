import React from 'react';
import { Header as SemanticHeader, Icon } from 'semantic-ui-react';

import { ThemeConsumer } from './ThemeContext';

export const Header: React.SFC = () => {
    return (
        <ThemeConsumer>
            {({ darkTheme }) => (
                <SemanticHeader as="h2" inverted={darkTheme}>
                    <Icon name="list alternate outline" />
                    <SemanticHeader.Content>
                        PR review schedule
                        <SemanticHeader.Subheader>
                            for PASHA Bank Digital Lab developers
                        </SemanticHeader.Subheader>
                    </SemanticHeader.Content>
                </SemanticHeader>
            )}
        </ThemeConsumer>
    );
};
