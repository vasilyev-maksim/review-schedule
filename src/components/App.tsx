import * as React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { API } from '../API';
import { ICamp } from '../models';
import { ErrorBoundary } from './ErrorBoundary';
import { Footer } from './Footer';
import { SchedulePage } from './SchedulePage';
import { TestEnvIndicator } from './TestEnvIndicator';
import { ThemeProvider } from './ThemeContext';

interface IState {
    camps: ICamp[] | null;
    error: boolean;
    loading: boolean;
    darkTheme: boolean;
}

export class App extends React.Component<{}, IState> {
    public state: IState = {
        camps: null,
        darkTheme: true,
        error: false,
        loading: true,
    };

    public componentDidMount (): void {
        API.getCamps((camps) => {
            this.setState({
                camps,
                loading: false,
            });
        });
    }

    private toggleTheme = (): void => {
        this.setState({ darkTheme: !this.state.darkTheme });
    }

    public render (): JSX.Element {
        return (
            <ThemeProvider value={{
                darkTheme: this.state.darkTheme,
                toggleDarkTheme: this.toggleTheme,
            }}>
                <div
                    style={{
                        backgroundColor: this.state.darkTheme ? '#3a3a3a' : 'initial',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <TestEnvIndicator />
                    <Container
                        style={{
                            flexGrow: 1,
                            margin: '40px 0',
                        }}
                    >
                        <ErrorBoundary>
                            <Router>
                                <Switch>
                                    <Route
                                        path="/schedule"
                                        render={() => (
                                            <SchedulePage
                                                camps={this.state.camps}
                                                loading={this.state.loading}
                                            />
                                        )}
                                    />
                                    <Redirect to="/schedule" />
                                </Switch>
                            </Router>
                        </ErrorBoundary>
                    </Container>
                    <Footer />
                </div >
            </ThemeProvider>
        );
    }
}
