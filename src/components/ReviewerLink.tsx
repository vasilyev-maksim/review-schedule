import * as React from 'react';

import { Provider } from '../enums';
import { IReviewer } from '../models';
import { getProvider } from '../providers/utils';

interface IProps {
    reviewer: IReviewer;
    provider: Provider;
    className?: string;
}

export const ReviewerLink: React.SFC<IProps> = ({ children, reviewer, provider, className }) => {
    const { href, target } = getProvider(provider).getLink(reviewer);

    return (
        <a
            href={href}
            target={target}
            className={className}
        >
            {children}
        </a>
    );
};
