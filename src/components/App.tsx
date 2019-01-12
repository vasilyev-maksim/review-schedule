import * as firebase from 'firebase';
import * as React from 'react';
import { Container, Header } from 'semantic-ui-react';

import { db } from '../db';
import { getReviewSchedule } from '../getReviewSchedule';
import { ISquad } from '../models';
import { ReviewScheduleTable } from './ReviewScheduleTable';

interface IState {
    squads: ISquad[];
    loading: boolean;
}

export class App extends React.Component<{}, IState> {
    public state: IState = {
        loading: true,
        squads: null,
    };

    public componentDidMount (): void {
        db.collection('squads').onSnapshot((querySnapshot) => {
            this.setState({
                loading: false,
                squads: querySnapshot.docs.map((doc) => doc.data() as ISquad),
            });
        });
    }

    public render (): JSX.Element {
        return (
            <div style={{ margin: '20px 0' }}>
                <Container>
                    <br />
                    <Header as="h1">Review schedule 🤟</Header>
                    <ReviewScheduleTable
                        loading={this.state.loading}
                        squads={this.state.squads}
                    />
                </Container>
            </div>
        );
    }
}

export default App;
