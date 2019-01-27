import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

import { NodeEnv } from '../enums';
import { getEnvironment } from '../environment';

export const TestEnvIndicator: React.SFC = () => {
    const env = getEnvironment();
    const href = `http://${env.firebaseAuthDomain}`;

    return env.nodeEnv !== NodeEnv.Production
        ? (
            <MediaQuery {...Responsive.onlyMobile}>
                {(isMobile) => {
                    const position = isMobile ? 'right' : 'left';
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
            </MediaQuery>
        )
        : null;
};
