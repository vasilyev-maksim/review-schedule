import React from 'react';
import { Header as SemanticHeader } from 'semantic-ui-react';

import { themeContext } from './ThemeContext';

interface IProps {
    text: React.ReactNode;
    icon: React.ReactNode;
}

export const Header: React.SFC<IProps> = ({ icon, text }) => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <SemanticHeader as="h2" inverted={darkTheme}>
            {icon}
            <SemanticHeader.Content>
                {text}
                <SemanticHeader.Subheader>
                    for PASHA Bank Digital Lab developers
                                    </SemanticHeader.Subheader>
            </SemanticHeader.Content>
        </SemanticHeader>
    );
};
