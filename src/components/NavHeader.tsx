import * as React from 'react';
import { Menu } from 'semantic-ui-react';

import { Logo } from './Logo';

// TODO: move styles to css
export const NavHeader: React.SFC = () => {
    return (
        <Menu.Item style={{ marginBottom: 0, padding: '40px 30px' }}>
            <div style={{
                display: 'flex',
            }}>
                <div>
                    <Logo />
                </div>
                <div style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <strong className="text white">
                        PASHA Bank
                        </strong>
                    <span className="text white">
                        Digital Lab
                        </span>
                </div>
            </div>
        </Menu.Item>
    );
};
