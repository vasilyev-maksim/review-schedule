import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Responsive } from 'semantic-ui-react';

import { FIRESTORE_CONFIG } from '../config';
import { NodeEnv } from '../enums';
import { environment } from '../environment';

export const TestEnvIndicator: React.SFC = () => {
    const href = `http://${FIRESTORE_CONFIG.authDomain}`;

    return environment.nodeEnv !== NodeEnv.Production
        ? (
            <MediaQuery {...Responsive.onlyMobile}>
                {(isMobile) => {
                    const position = isMobile ? 'right' : 'left';
                    const size = isMobile ? 'big' : 'huge';
                    const iconName = environment.mockAPI ? 'database' : 'code';

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
