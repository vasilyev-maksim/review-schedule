import { db } from '../db';
import { ICamp } from '../models';
import { IAPI } from './models';

export const APIImpl: IAPI = {
    getCamps (callback: (camps: ICamp[]) => void): void {
        db.collection('camps').onSnapshot((querySnapshot) => {
            const camps = querySnapshot.docs.map((doc) => doc.data() as ICamp);
            callback(camps);
        });
    }
};
