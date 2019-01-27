import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

import { Provider } from '../enums';
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
                <AuthorsList provider={Provider.GitHub} />

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
