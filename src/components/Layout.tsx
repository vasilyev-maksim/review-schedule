import classnames from 'classnames';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { Container } from './Container';
import { Doodle } from './Doodle';
import { ErrorBoundary } from './ErrorBoundary';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileMediaQuery } from './MobileMediaQuery';
import { Navs } from './Navs';
import { TestEnvIndicator } from './TestEnvIndicator';
import { themeContext } from './ThemeContext';
import { ThemeSwitch } from './ThemeSwitch';

interface IProps {
    content: React.ReactNode;
    headerText: React.ReactNode;
    headerIcon: React.ReactNode;
    menu: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ content, headerText, headerIcon, menu }) => {
    const { darkTheme } = React.useContext(themeContext);

    return (
        <div className={classnames('layout', { dark: darkTheme })}>
            <TestEnvIndicator />
            <Navs />

            <Container>
                <ErrorBoundary>
                    <Grid columns={2} stackable style={{ marginBottom: 0 }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header
                                    text={headerText}
                                    icon={headerIcon}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                {menu}
                                &nbsp;
                                &nbsp;
                                            <ThemeSwitch />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {content}
                </ErrorBoundary>
            </Container>

            <Footer />
            <MobileMediaQuery>
                {(isMobile) => !isMobile && <Doodle />}
            </MobileMediaQuery>
        </div>
    );
};
