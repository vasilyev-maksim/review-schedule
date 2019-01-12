import React from 'react';
import { Header as SemantiHeader, Icon } from 'semantic-ui-react';

export const Header: React.SFC = () => {
    return (
        <SemantiHeader as="h2">
            <Icon name="list alternate outline" />
            <SemantiHeader.Content>
                Review schedule
                <SemantiHeader.Subheader>For PASHABank engineers</SemantiHeader.Subheader>
            </SemantiHeader.Content>
        </SemantiHeader>
    );
};
