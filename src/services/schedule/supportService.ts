import { REVIEW_REFERENCE_POINT } from '../../config';
import { eachDayRanger } from './eachDayRanger';
import { memberSequencer } from './memberFilter';
import { ScheduleService } from './scheduleService';
import { sequencer } from './sequencer';

export const supportService = new ScheduleService(
    sequencer,
    eachDayRanger,
    memberSequencer,
    REVIEW_REFERENCE_POINT,
);
