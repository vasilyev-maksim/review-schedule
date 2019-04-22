import * as React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { API } from '../API';
import { ICamp } from '../models';
import { reviewService } from '../services/schedule/reviewService';
import { supportService } from '../services/schedule/supportService';
import { CampMenu } from './CampMenu';
import { Layout } from './Layout';
import { SchedulePage } from './SchedulePage';
import { ThemeProvider } from './ThemeContext';

interface IState {
    camps: ICamp[] | null;
    loading: boolean;
    darkTheme: boolean;
}

export class App extends React.Component<{}, IState> {
    public state: IState = {
        camps: null,
        darkTheme: true,
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
                <Router>
                    <Layout
                        content={(
                            <Switch>
                                <Route
                                    path="/review-schedule"
                                    render={() => (
                                        <SchedulePage
                                            key="review-schedule"
                                            scheduleService={reviewService}
                                            camps={this.state.camps}
                                            loading={this.state.loading}
                                            url="/review-schedule"
                                        />
                                    )}
                                />
                                <Route
                                    path="/support-schedule"
                                    render={() => (
                                        <SchedulePage
                                            key="support-schedule"
                                            scheduleService={supportService}
                                            camps={this.state.camps}
                                            loading={this.state.loading}
                                            url="/support-schedule"
                                        />
                                    )}
                                />
                                <Redirect to="/review-schedule" />
                            </Switch>
                        )}
                        headerIcon={(
                            <Switch>
                                <Route path="/review-schedule" render={() => <Icon name="code branch" />} />
                                <Route path="/support-schedule" render={() => <Icon name="heartbeat" />} />
                            </Switch>
                        )}
                        headerText={(
                            <Switch>
                                <Route path="/review-schedule" render={() => 'PR review schedule'} />
                                <Route path="/support-schedule" render={() => 'Product support schedule'} />
                            </Switch>
                        )}
                        menu={(
                            <Switch>
                                <Route
                                    path="/review-schedule"
                                    render={() => (
                                        <CampMenu
                                            camps={this.state.camps}
                                            url="/review-schedule"
                                        />
                                    )}
                                />
                                <Route
                                    path="/support-schedule"
                                    render={() => (
                                        <CampMenu
                                            camps={this.state.camps}
                                            url="/support-schedule"
                                        />
                                    )}
                                />
                            </Switch>
                        )}
                    />
                </Router>
            </ThemeProvider>
        );
    }
}
