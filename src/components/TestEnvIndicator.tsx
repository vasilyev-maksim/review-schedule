import * as React from 'react';
import { Icon } from 'semantic-ui-react';

import { NodeEnv } from '../enums';
import { getEnvironment } from '../environment';
import { MobileMediaQuery } from './MobileMediaQuery';

export const TestEnvIndicator: React.SFC = () => {
    const env = getEnvironment();
    const href = `http://${env.firebaseAuthDomain}`;

    return env.nodeEnv !== NodeEnv.Production
        ? (
            <MobileMediaQuery>
                {(isMobile) => {
                    const position = isMobile ? 'right' : 'right';
                    const size = isMobile ? 'big' : 'huge';
                    const iconName = env.mockAPI ? 'database' : 'code';

                    return (
                        <a
                            href={href}
                            target="_blank"
                            className={`ui ${position} ${size} corner label green`}
                        >
                            <Icon name={iconName} />
                        </a>
                    );
                }}
            </MobileMediaQuery>
        )
        : null;
};
