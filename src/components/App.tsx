import * as React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { db } from '../db';
import { ICamp } from '../models';
import { SchedulePage } from './SchedulePage';

interface IState {
    camps: ICamp[];
    loading: boolean;
}

export class App extends React.Component<{}, IState> {
    public state: IState = {
        camps: null,
        loading: true,
    };

    public componentDidMount (): void {
        db.collection('camps').onSnapshot((querySnapshot) => {
            this.setState({
                camps: querySnapshot.docs.map((doc) => doc.data() as ICamp),
                loading: false,
            });
        });
    }

    public render (): JSX.Element {
        return (
            <div style={{ margin: '40px 0' }}>
                <Container>
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
                </Container>
            </div>
        );
    }
}
