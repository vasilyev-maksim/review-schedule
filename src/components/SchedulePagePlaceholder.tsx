import * as React from 'react';

import { MembersOfTheDayPlaceholder } from './MembersOfTheDayPlaceholder';
import { ScheduleTableFilter } from './ScheduleTableFilter';
import { ScheduleTablePlaceholder } from './ScheduleTablePlaceholder';

export const SchedulePagePlaceholder: React.FC = () => {
    return (
        <>
            <MembersOfTheDayPlaceholder />
            <ScheduleTableFilter />
            <ScheduleTablePlaceholder />
        </>
    );
};
