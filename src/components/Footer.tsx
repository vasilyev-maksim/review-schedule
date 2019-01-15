import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

import { FooterLink } from './Link';

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
                    <FooterLink href="https://github.com/jamil-alisgandarov">
                        Jamil Alisgandarov
                    </FooterLink>
                    and
                    <FooterLink href="https://github.com/maksim-vasilyev-pb">
                        Vasilyev Maksim
                    </FooterLink>
                </div>

                <br />
                <br />
                <FooterLink href="https://github.com/PB-Digital/review-schedule">
                    <Icon
                        name="github"
                        size="big"
                        link
                    />
                </FooterLink>
            </Container>
        </Segment>
    );
};
