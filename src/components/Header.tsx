import React from 'react';
import { Header as SemanticHeader, Icon } from 'semantic-ui-react';

export const Header: React.SFC = () => {
    return (
        <SemanticHeader as="h2">
            <Icon name="list alternate outline" />
            <SemanticHeader.Content>
                PR review schedule
                <SemanticHeader.Subheader>
                    for PASHA Bank Digital Lab developers
                </SemanticHeader.Subheader>
            </SemanticHeader.Content>
        </SemanticHeader>
    );
};
