import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { ICamp } from '../models';
import { saveSelectedCampToCookies } from '../utils';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    camps?: ICamp[] | null;
    currentCampName?: string;
}

export const CampMenu: React.SFC<IProps> = ({ camps, currentCampName }) => {
    return (
        <ThemeConsumer>
            {({ darkTheme }) => (
                <Menu
                    inverted={darkTheme}
                    compact
                    floated="right"
                    style={{ visibility: camps && camps.length ? 'visible' : 'hidden' }}
                >
                    {
                        camps && camps.length && camps.map(
                            (camp) => (
                                camp && camp.name && (
                                    <Menu.Item
                                        key={camp.name}
                                        active={currentCampName === camp.name}
                                        as={Link}
                                        to={'/schedule/' + encodeURIComponent(camp.name)}
                                        style={{ textTransform: 'capitalize' }}
                                        onClick={() => saveSelectedCampToCookies(camp)}
                                    >
                                        <Icon name={camp.icon} />
                                        &nbsp;
                                        &nbsp;
                                        {camp.name}
                                    </Menu.Item>
                                )
                            )
                        )
                    }
                </Menu>
            )}
        </ThemeConsumer>
    );
};
