import * as React from 'react';
import { AUTHORS } from '../config';

interface IProps {
    linkClassName?: string;
}

export const AuthorsList: React.SFC<IProps> = ({ linkClassName }) => {
    return (
        <>
            {
                AUTHORS.map((author, i) => {
                    const href = 'https://github.com/' + author.githubUsername;
                    return (
                        <React.Fragment key={author.githubId}>
                            <a
                                href={href}
                                target="_blank"
                                className={linkClassName}
                            >
                                {author.name} {author.surname}
                            </a>
                            {/* TODO: improve - author1, author2 and author3 */}
                            {i < AUTHORS.length - 1 && <>and</>}
                        </React.Fragment>
                    );
                })
            }
        </>
    );
};
