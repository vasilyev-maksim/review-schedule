import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

import { AuthorsList } from './AuthorsList';

export const Footer: React.SFC = () => {
    return (
        <Segment
            className="footer"
            inverted
            vertical
        >
            <Container textAlign="center">
                Developed with
                <Icon name="heart" fitted />

                <div className="autors">
                    by
                    <AuthorsList linkClassName="footer-link" />
                </div>

                <br />
                <br />
                <a
                    href="https://github.com/PB-Digital/review-schedule"
                    target="_blank"
                    className="footer-link"
                >
                    <Icon
                        name="github"
                        size="big"
                        link
                    />
                </a>
            </Container>
        </Segment>
    );
};
