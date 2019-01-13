import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export const WeekendMessage: React.SFC = () => {
    return (
        <Header as="h1" icon textAlign="center">
            <Icon name="gamepad" />
            <Header.Content>Enjoy your weekends!</Header.Content>
        </Header>
    );
};
