import * as React from 'react';

import { ICamp } from '../models';
import { IScheduleService } from '../services/schedule/models';
import { CurrentCampProvider } from './CurrentCampProvider';
import { SchedulePagePlaceholder } from './SchedulePagePlaceholder';
import { SchedulePageView } from './SchedulePageView';

interface IProps {
    loading: boolean;
    scheduleService: IScheduleService;
    camps: ICamp[] | null;
    url: string;
}

export const SchedulePage: React.FC<IProps> = ({ loading, camps, scheduleService, url }) => {
    return loading
        ? <SchedulePagePlaceholder />
        : (
            <CurrentCampProvider
                camps={camps}
                url={url}
            >
                {(currentCamp) => (
                    <SchedulePageView
                        key={currentCamp.name}
                        camp={currentCamp}
                        scheduleService={scheduleService}
                    />
                )}
            </CurrentCampProvider>
        );
};
