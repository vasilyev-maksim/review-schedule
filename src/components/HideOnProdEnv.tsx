import * as React from 'react';

export const HideOnProdEnv: React.SFC = ({ children }) => {
    return process.env.NODE_ENV !== 'production'
        // need to wrap children into fragment
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
        ? <>{children}</>
        : null;
};
