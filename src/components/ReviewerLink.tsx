import * as React from 'react';

import { IReviewer } from '../models';
import { IProvider } from '../providers/models';

interface IProps {
    reviewer: IReviewer;
    provider: IProvider;
    className?: string;
}

export const ReviewerLink: React.SFC<IProps> = ({ children, reviewer, provider, className }) => {
    const { href, target } = provider.getLink(reviewer);

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
