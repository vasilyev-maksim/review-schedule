import * as React from 'react';
import { Container } from 'semantic-ui-react';

import { db } from '../db';
import { getReviewSchedule } from '../getReviewSchedule';
import { ISquad } from '../models';
import { getCurrentDate, isWorkingDay } from '../utils';
import { Header } from './Header';
import { ReviewersOfTheDay } from './ReviewersOfTheDay';
import { ReviewersOfTheDayPlaceholder } from './ReviewersOfTheDayPlaceholder';
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
        const schedule = this.state.squads
            ? getReviewSchedule(this.state.squads)
            : [];
        const isTodayWorkingDay = isWorkingDay(getCurrentDate());

        return (
            <div style={{ margin: '40px 0' }}>
                <Container>
                    <Header />
                    {
                        isTodayWorkingDay && (
                            <>
                                <br />
                                {
                                    this.state.loading
                                        ? <ReviewersOfTheDayPlaceholder />
                                        : <ReviewersOfTheDay schedule={schedule} />
                                }
                            </>
                        )
                    }
                    {
                        this.state.loading
                            ? <ReviewScheduleTablePlaceholder />
                            : <ReviewScheduleTable schedule={schedule} />
                    }
                </Container>
            </div>
        );
    }
}

export default App;
