import { ICamp } from '../models';
import { campsMock } from './mocks';
import { IAPI } from './models';

class APIMockClass implements IAPI {
    public getCamps (callback: (camps: ICamp[]) => void): () => void {
        const id = setTimeout(() => callback(campsMock), 1000);
        return () => clearTimeout(id);
    }
}

export const APIMock = new APIMockClass();
