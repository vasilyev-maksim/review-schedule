import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

import { HideOnProdEnv } from './HideOnProdEnv';

export const StagingEnvIndicator: React.SFC = () => {
    return (
        <HideOnProdEnv>
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
        </HideOnProdEnv>
    );
};
