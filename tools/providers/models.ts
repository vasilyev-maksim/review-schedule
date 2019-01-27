import { Provider } from '../../src/enums';
import { IReviewer } from '../../src/models';

export interface IProvider<T> {
    getProviderName (): Provider;
    findUsers (names: string[], list: T[]): T[];
    getAllUsers (): Promise<T[]>;
    convertToReviewer (user: T): Partial<IReviewer>;
}
