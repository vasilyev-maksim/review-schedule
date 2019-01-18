import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { ICamp } from '../models';
import { saveSelectedCampToCookies } from '../utils';

interface IProps {
    camps?: ICamp[];
    currentCampName?: string;
}

export const CampMenu: React.SFC<IProps> = ({ camps, currentCampName }) => {
    return (
        <Menu
            compact
            floated="right"
            style={{ visibility: camps ? 'visible' : 'hidden' }}
        >
            {
                camps && camps.length && camps.map(
                    (camp) => (
                        camp && camp.name && (
                            <Menu.Item
                                key={camp.name}
                                name="gamepad"
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
    );
};
