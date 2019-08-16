import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { ICamp } from '../models';
import { findCampByName, getDefaultCampName } from '../utils';

interface IProps {
    camps: ICamp[] | null;
    url: string;
    children: (camp: ICamp) => React.ReactNode
}

export const CurrentCampProvider: React.SFC<IProps> = ({ camps, url, children }) => {
    const defaultCampName = getDefaultCampName(camps);

    return (
        <Switch>
            {defaultCampName && (
                <Redirect
                    exact
                    from={url}
                    to={url + '/' + defaultCampName}
                />
            )}
            <Route
                path={url + '/:currentCampName?'}
                render={({ match: { params: { currentCampName } } }) => {
                    const currentCamp = findCampByName(camps, currentCampName);

                    if (currentCamp) {
                        return children(currentCamp);
                    } else if (defaultCampName) {
                        return <Redirect to={url + '/' + defaultCampName} />;
                    } else {
                        return null;
                    }
                }}
            />
        </Switch>
    );
};
