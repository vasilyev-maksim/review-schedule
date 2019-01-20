import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

import { github } from '../providers/github';
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

                by
                <AuthorsList provider={github} />

                <br />
                <br />
                <a href="https://github.com/PB-Digital/review-schedule" target="_blank">
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
