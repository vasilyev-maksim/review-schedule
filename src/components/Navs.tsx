import React from 'react';
import { Menu } from 'semantic-ui-react';

import { MobileMediaQuery } from './MobileMediaQuery';
import { NavHeader } from './NavHeader';
import { NavLink } from './NavLink';

import classnames = require('classnames');

export const Navs: React.SFC = () => {
    return (
        <MobileMediaQuery>
            {(isMobile) => {
                return (
                    <Menu
                        widths={isMobile ? '2' : undefined}
                        vertical={!isMobile}
                        inverted
                        fixed={isMobile ? 'bottom' : 'left'}
                        className={classnames('navs', { shadow: isMobile })}
                        style={{ color: 'red' }}
                    >
                        {!isMobile && <NavHeader />}

                        <NavLink
                            to="/review-schedule"
                            icon="code branch"
                            text="Review schedule"
                        />
                        <NavLink
                            to="/support-schedule"
                            icon="heartbeat"
                            text="Support schedule"
                        />
                    </Menu>
                );
            }}
        </MobileMediaQuery>
    );
};
