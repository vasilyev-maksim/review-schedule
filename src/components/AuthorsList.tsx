import * as React from 'react';

import { AUTHORS } from '../config';
import { IProvider } from '../providers/models';
import { ReviewerLink } from './ReviewerLink';

interface IProps {
    linkClassName?: string;
    provider: IProvider;
}

export const AuthorsList: React.SFC<IProps> = ({ linkClassName, provider }) => {
    return (
        <>
            {
                AUTHORS.map((author, i) => {
                    return (
                        <React.Fragment key={author.githubId}>
                            <ReviewerLink
                                reviewer={author}
                                provider={provider}
                                className={linkClassName}
                            >
                                {author.name} {author.surname}
                            </ReviewerLink>
                            {/* TODO: improve - author1, author2 and author3 */}
                            {i < AUTHORS.length - 1 && <>and</>}
                        </React.Fragment>
                    );
                })
            }
        </>
    );
};
