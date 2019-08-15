import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { ICamp } from '../models';
import { saveSelectedCampToCookies } from '../utils';
import { CurrentCampProvider } from './CurrentCampProvider';
import { themeContext } from './ThemeContext';

interface IProps {
    camps?: ICamp[] | null;
    url: string;
}

export const CampMenu: React.SFC<IProps> = ({ camps, url }) => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <CurrentCampProvider camps={camps} url={url}>
            {({ name: currentCampName }) => (
                <Menu
                    inverted={darkTheme}
                    compact
                    style={{ visibility: camps && camps.length ? 'visible' : 'hidden' }}
                >
                    {camps && camps.length && camps.map(
                        (camp) => (
                            camp && camp.name && (
                                <Menu.Item
                                    key={camp.name}
                                    active={currentCampName === camp.name}
                                    as={Link}
                                    to={url + '/' + encodeURIComponent(camp.name)}
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
                    )}
                </Menu>
            )}
        </CurrentCampProvider>
    );
};
