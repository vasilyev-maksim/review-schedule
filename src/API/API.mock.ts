import { ICamp } from '../models';
import { campsMock } from './mocks';
import { IAPI } from './models';

export const APIMock: IAPI = {
    getCamps (callback: (camps: ICamp[]) => void): void {
        callback(campsMock);
    }
};
