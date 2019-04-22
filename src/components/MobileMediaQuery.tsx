import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Responsive } from 'semantic-ui-react';

interface IProps {
    children: (isMobile: boolean) => React.ReactNode;
}

export const MobileMediaQuery: React.SFC<IProps> = ({ children }) => {
    return (
        <MediaQuery {...Responsive.onlyMobile}>
            {children}
        </MediaQuery>
    );
};
