import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { ICamp } from '../models';
import { reviewService } from '../services/schedule/reviewService';
import { getCurrentDate, getDefaultCampName, isWorkingDay } from '../utils';
import { CampMenu } from './CampMenu';
import { Header } from './Header';
import { MembersOfTheDay } from './MembersOfTheDay';
import { MembersOfTheDayPlaceholder } from './MembersOfTheDayPlaceholder';
import { ScheduleTable } from './ScheduleTable';
import { ScheduleTablePlaceholder } from './ScheduleTablePlaceholder';
import { ThemeSwitch } from './ThemeSwitch';
import { WeekendMessage } from './WeekendMessage';

interface IProps {
    camps: ICamp[] | null;
    loading: boolean;
}

export const SchedulePage: React.SFC<IProps> = ({ camps, loading }) => {
    const isTodayWorkingDay = isWorkingDay(getCurrentDate());

    if (loading) {
        return (
            <>
                <Grid columns={2} stackable style={{ marginBottom: 0 }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header />
                        </Grid.Column>
                        <Grid.Column>
                            <ThemeSwitch />
                            <CampMenu />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    isTodayWorkingDay
                        ? <MembersOfTheDayPlaceholder />
                        : <WeekendMessage />
                }
                <ScheduleTablePlaceholder scheduleService={reviewService} />
            </>
        );
    } else {
        const defaultCampName = getDefaultCampName(camps);

        return (
            <Switch>
                {defaultCampName && (
                    <Redirect
                        exact
                        from="/schedule"
                        to={'/schedule/' + defaultCampName}
                    />
                )}
                <Route
                    path="/schedule/:camp?"
                    render={(props) => {
                        const { camp: currentCampName } = props.match.params;
                        const currentCamp = camps && camps.find(
                            (camp) => encodeURIComponent(camp.name) === encodeURIComponent(currentCampName)
                        );

                        if (!currentCamp && defaultCampName) {
                            return <Redirect to={'/schedule/' + defaultCampName} />;
                        }

                        const squads = currentCamp && currentCamp.squads || [];

                        return (
                            <>
                                <Grid columns={2} stackable style={{ marginBottom: 0 }}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <ThemeSwitch />
                                            <CampMenu
                                                currentCampName={currentCampName}
                                                camps={camps}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                {
                                    isTodayWorkingDay
                                        ? <MembersOfTheDay squads={squads} scheduleService={reviewService} />
                                        : <WeekendMessage />
                                }
                                <ScheduleTable squads={squads} scheduleService={reviewService} />
                            </>
                        );
                    }}
                />
            </Switch>
        );
    }
};
