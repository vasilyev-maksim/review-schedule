import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

export const StagingEnvIndicator: React.SFC = () => {
    return process.env.NODE_ENV !== 'production'
        ? (
            <MediaQuery {...Responsive.onlyMobile}>
                {(isMobile) => {
                    const position = isMobile ? 'right' : 'left';
                    const size = isMobile ? 'big' : 'huge';
                    return (
                        <span className={`ui ${position} ${size} corner label green`}>
                            <Icon name="wrench" />
                        </span>
                    );
                }}
            </MediaQuery>
        )
        : null;
};
