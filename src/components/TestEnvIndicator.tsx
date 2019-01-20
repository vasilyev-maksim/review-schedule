import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

import { EnvironmentVariable, NodeEnv } from '../enums';
import { VisibilityFilterByEnv } from './VisibilityFilterByEnv';

export const TestEnvIndicator: React.SFC = () => {
    return (
        <VisibilityFilterByEnv
            variable={EnvironmentVariable.NodeEnv}
            not
            value={NodeEnv.Production}
        >
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
        </VisibilityFilterByEnv>
    );
};
