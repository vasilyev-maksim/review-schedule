import { ICamp } from '../models';
import { db } from './db';
import { IAPI } from './models';

export const APIImpl: IAPI = {
    getCamps (callback: (camps: ICamp[]) => void): void {
        db.collection('camps').onSnapshot((querySnapshot) => {
            const camps = querySnapshot.docs.map((doc) => doc.data() as ICamp);
            callback(camps);
        });
    }
};
