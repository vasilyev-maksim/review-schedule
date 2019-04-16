import * as React from 'react';

import { Provider } from '../enums';
import { IMember } from '../models';
import { getProvider } from '../providers/utils';

interface IProps {
    member: IMember;
    provider: Provider;
    className?: string;
}

export const MemberLink: React.SFC<IProps> = ({ children, member, provider, className }) => {
    const { href, target } = getProvider(provider).getLink(member);

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
