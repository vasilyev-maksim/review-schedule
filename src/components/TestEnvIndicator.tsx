import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

import { FIRESTORE_CONFIG } from '../config';
import { EnvironmentVariable, NodeEnv } from '../enums';
import { VisibilityFilterByEnv } from './VisibilityFilterByEnv';

export const TestEnvIndicator: React.SFC = () => {
    const href = `http://${FIRESTORE_CONFIG[NodeEnv.Production]!.authDomain}`;
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
                        <a
                            href={href}
                            target="_blank"
                            className={`ui ${position} ${size} corner label green`}
                        >
                            <Icon name="wrench" />
                        </a>
                    );
                }}
            </MediaQuery>
        </VisibilityFilterByEnv>
    );
};
