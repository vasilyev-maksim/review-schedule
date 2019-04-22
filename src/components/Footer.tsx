import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

import { Provider } from '../enums';
import { AuthorsList } from './AuthorsList';
import { MobileMediaQuery } from './MobileMediaQuery';

export const Footer: React.SFC = () => {
    return (
        <MobileMediaQuery>
            {(isMobile) => (
                <Segment
                    className="footer"
                    inverted
                    vertical
                    style={{ marginBottom: isMobile ? 40 : 0 }}
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
            )}
        </MobileMediaQuery>
    );
};
