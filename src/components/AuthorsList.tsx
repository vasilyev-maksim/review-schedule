import * as React from 'react';

import { AUTHORS } from '../config';
import { Provider } from '../enums';
import { MemberLink } from './MemberLink';

interface IProps {
    provider: Provider;
}

export const AuthorsList: React.SFC<IProps> = ({ provider }) => {
    return (
        <div className="authors">
            {
                AUTHORS.map((author, i) => {
                    return (
                        <React.Fragment key={author.githubId}>
                            <MemberLink
                                member={author}
                                provider={provider}
                            >
                                {author.name} {author.surname}
                            </MemberLink>
                            {/* TODO: improve - author1, author2 and author3 */}
                            {i < AUTHORS.length - 1 && <>and</>}
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
};
