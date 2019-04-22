import * as React from 'react';
import { Container as SemanticContainer } from 'semantic-ui-react';

import { MobileMediaQuery } from './MobileMediaQuery';

export const Container: React.SFC = ({ children }) => {
    return (
        <MobileMediaQuery>
            {(isMobile) => {
                return isMobile
                    ? (
                        <SemanticContainer className="page-wrapper">
                            {children}
                        </SemanticContainer>
                    )
                    : (
                        <div className="_container">
                            <div className="left" />
                            <div className="center">
                                <SemanticContainer className="page-wrapper">
                                    {children}
                                </SemanticContainer>
                            </div>
                            <div className="right" />
                        </div>
                    );
            }}
        </MobileMediaQuery>
    );
};
