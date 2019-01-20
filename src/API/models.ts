import { ICamp } from '../models';

export interface IAPI {
    getCamps (callback: (camps: ICamp[]) => void): void;
}
