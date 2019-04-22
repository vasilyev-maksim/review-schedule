import React from 'react';
import { Header as SemanticHeader } from 'semantic-ui-react';

import { ThemeConsumer } from './ThemeContext';

interface IProps {
    text: React.ReactNode;
    icon: React.ReactNode;
}

export const Header: React.SFC<IProps> = ({ icon, text }) => {
    return (
        <ThemeConsumer>
            {({ darkTheme }) => (
                <SemanticHeader as="h2" inverted={darkTheme}>
                    {icon}
                    <SemanticHeader.Content>
                        {text}
                        <SemanticHeader.Subheader>
                            for PASHA Bank Digital Lab developers
                                    </SemanticHeader.Subheader>
                    </SemanticHeader.Content>
                </SemanticHeader>
            )}
        </ThemeConsumer>
    );
};
