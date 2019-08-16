import { ICamp } from '../models';
import { getDBInstance } from './db';
import { IAPI } from './models';

class APIImplClass implements IAPI {
    public getCamps (callback: (camps: ICamp[]) => void): () => void {
        const db = getDBInstance();
        return db.collection('camps').onSnapshot((querySnapshot) => {
            const camps = querySnapshot.docs.map((doc) => doc.data() as ICamp);
            callback(camps);
        });
    }
}

export const APIImpl = new APIImplClass();
