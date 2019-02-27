import { ICamp } from '../models';
import { getDBInstance } from './db';
import { IAPI } from './models';

export const APIImpl: IAPI = {
    getCamps (callback: (camps: ICamp[]) => void): void {
        const db = getDBInstance();
        db.collection('camps').onSnapshot((querySnapshot) => {
            const camps = querySnapshot.docs.map((doc) => doc.data() as ICamp);
            callback(camps);
        });
    }
};
