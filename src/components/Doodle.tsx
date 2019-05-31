import { random } from 'lodash';
import * as React from 'react';

import { PartyParrotDoodle } from './PartyParrotDoodle';
import { VitaliyDoodle } from './VitaliyDoodle';

const showVitaliy = random(10) <= 2;

export const Doodle: React.SFC = () => {
    return showVitaliy
        ? <VitaliyDoodle />
        : <PartyParrotDoodle />;
};
