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

export const App: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [camps, setCamps] = React.useState<ICamp[] | null>(null);
    const [darkTheme, setDarkTheme] = React.useState(true);

    const handleThemeToggle = React.useCallback(
        () => setDarkTheme(!darkTheme),
        [darkTheme]
    );

    React.useEffect(
        () => {
            return API.getCamps((_camps) => {
                setLoading(false);
                setCamps(_camps);
            });
        },
        []
    );

    return (
        <ThemeProvider value={{
            darkTheme,
            toggleDarkTheme: handleThemeToggle,
        }}>
            <Router>
                <Layout
                    content={(
                        <Switch>
                            <Route
                                path="/review-schedule"
                                render={() => (
                                    <SchedulePage
                                        url="/review-schedule"
                                        key="review-schedule"
                                        scheduleService={reviewService}
                                        camps={camps}
                                        loading={loading}
                                    />
                                )}
                            />
                            <Route
                                path="/support-schedule"
                                render={() => (
                                    <SchedulePage
                                        url="/support-schedule"
                                        key="support-schedule"
                                        scheduleService={supportService}
                                        camps={camps}
                                        loading={loading}
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
                                        camps={camps}
                                        url="/review-schedule"
                                    />
                                )}
                            />
                            <Route
                                path="/support-schedule"
                                render={() => (
                                    <CampMenu
                                        camps={camps}
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
};
