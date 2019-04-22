import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon, Menu, SemanticICONS } from 'semantic-ui-react';

interface IProps {
    to: string;
    icon: SemanticICONS;
    text: string;
}

export const NavLink: React.SFC<IProps> = ({ to, icon, text }) => {
    return (
        <Route
            path={to}
            children={({ match }) => (
                <Menu.Item
                    active={Boolean(match)}
                    as={Link}
                    to={to}
                >
                    <Icon name={icon} style={{ float: 'left', margin: '0 1em 0 0' }} />
                    {text}
                </Menu.Item>
            )}
        />
    );
};
