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

interface IState {
    camps: ICamp[] | null;
    error: boolean;
    loading: boolean;
}

export class App extends React.Component<{}, IState> {
    public state: IState = {
        camps: null,
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

    public render (): JSX.Element {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
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
        );
    }
}
