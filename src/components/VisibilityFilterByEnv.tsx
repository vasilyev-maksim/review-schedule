import * as React from 'react';

import { EnvironmentVariable } from '../enums';
import { getEnvironmentVariableValue } from '../utils';

interface IProps {
    variable: EnvironmentVariable;
    not?: boolean;
    value: string | string[];
}

export const VisibilityFilterByEnv: React.SFC<IProps> = ({ variable, not, value: values, children }) => {
    const envValue = getEnvironmentVariableValue(variable);
    const envValueMatched = typeof values === 'string'
        ? values === envValue
        : values.some((val) => val === envValue);
    const shouldRenderChildren = !not === envValueMatched;

    return shouldRenderChildren
        // need to wrap children into fragment
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
        ? <>{children}</>
        : null;
};
