import * as React from 'react';

interface IProps {
    href?: string;
}

export const FooterLink: React.SFC<IProps> = ({ children, href }) => {
    return (
        <a
            href={href || '#'}
            target="_blank"
            className="footer-link"
        >
            {children}
        </a>
    );
};
