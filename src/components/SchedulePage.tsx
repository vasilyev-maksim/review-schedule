import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { getSchedule } from '../getSchedule';
import { ICamp } from '../models';
import { getCurrentDate, getSelectedCampFromCookies, isWorkingDay } from '../utils';
import { CampMenu } from './CampMenu';
import { Header } from './Header';
import { ReviewersOfTheDay } from './ReviewersOfTheDay';
import { ReviewersOfTheDayPlaceholder } from './ReviewersOfTheDayPlaceholder';
import { ScheduleTable } from './ScheduleTable';
import { ScheduleTablePlaceholder } from './ScheduleTablePlaceholder';
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
                            <CampMenu />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    isTodayWorkingDay
                        ? <ReviewersOfTheDayPlaceholder />
                        : <WeekendMessage />
                }
                <ScheduleTablePlaceholder />
            </>
        );
    } else {
        let defaultCampName: string | null = null;

        if (camps && camps.length) {
            const cookieCampName = getSelectedCampFromCookies();
            if (cookieCampName) {
                const cookieCamp = camps.some((camp) => camp.name === cookieCampName);
                if (cookieCamp) {
                    defaultCampName = cookieCampName;
                }
            } else {
                const firstCampName = camps[0].name;
                if (firstCampName) {
                    defaultCampName = encodeURIComponent(firstCampName);
                }
            }
        }

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

                        const schedule = currentCamp && currentCamp.squads
                            ? getSchedule(currentCamp.squads)
                            : [];

                        return (
                            <>
                                <Grid columns={2} stackable style={{ marginBottom: 0 }}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <CampMenu
                                                currentCampName={currentCampName}
                                                camps={camps}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                {
                                    isTodayWorkingDay
                                        ? <ReviewersOfTheDay schedule={schedule} />
                                        : <WeekendMessage />
                                }
                                <ScheduleTable schedule={schedule} />
                            </>
                        );
                    }}
                />
            </Switch>
        );
    }
};
