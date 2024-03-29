import { REVIEW_REFERENCE_POINT } from '../../config';
import { memberSequencer } from './memberFilter';
import { ScheduleService } from './scheduleService';
import { sequencer } from './sequencer';
import { workingDayRanger } from './workingDayRanger';

export const reviewService = new ScheduleService(
    sequencer,
    workingDayRanger,
    memberSequencer,
    REVIEW_REFERENCE_POINT,
);
