import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { getSchedule } from '../getSchedule';
import { ICamp } from '../models';
import { getCurrentDate, isWorkingDay } from '../utils';
import { CampMenu } from './CampMenu';
import { Header } from './Header';
import { ReviewersOfTheDay } from './ReviewersOfTheDay';
import { ReviewersOfTheDayPlaceholder } from './ReviewersOfTheDayPlaceholder';
import { ScheduleTable } from './ScheduleTable';
import { ScheduleTablePlaceholder } from './ScheduleTablePlaceholder';

interface IProps {
    camps: ICamp[];
    loading: boolean;
}

export const SchedulePage: React.SFC<IProps> = ({ camps, loading }) => {
    const defaultCampName = !loading
        && camps
        && camps.length
        && camps[0]
        && encodeURIComponent(camps[0].name);

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
                    const isTodayWorkingDay = isWorkingDay(getCurrentDate());
                    const currentCamp = camps && camps.find(
                        (camp) => encodeURIComponent(camp.name) === currentCampName
                    );
                    const schedule = currentCamp && currentCamp.squads
                        ? getSchedule(currentCamp.squads)
                        : [];

                    return (
                        <>
                            <Grid columns={2} stackable>
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
                                isTodayWorkingDay && (
                                    <>
                                        <br />
                                        {
                                            loading
                                                ? <ReviewersOfTheDayPlaceholder />
                                                : <ReviewersOfTheDay schedule={schedule} />
                                        }
                                    </>
                                )
                            }
                            {
                                loading
                                    ? <ScheduleTablePlaceholder />
                                    : <ScheduleTable schedule={schedule} />
                            }
                        </>
                    );
                }}
            />
        </Switch>
    );
};
