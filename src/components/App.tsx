import * as React from 'react';
import { Container } from 'semantic-ui-react';

import { db } from '../db';
import { ISquad } from '../models';
import { Header } from './Header';
import { ReviewScheduleTable } from './ReviewScheduleTable';
import { ReviewScheduleTablePlaceholder } from './ReviewScheduleTablePlaceholder';

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
            <div style={{ margin: '40px 0' }}>
                <Container>
                    <Header />
                    {this.state.loading
                        ? <ReviewScheduleTablePlaceholder />
                        : <ReviewScheduleTable squads={this.state.squads} />
                    }
                </Container>
            </div>
        );
    }
}

export default App;
