import { Provider } from '../../src/enums';
import { IReviewer } from '../../src/models';

export interface IProvider<T> {
    getProviderName (): Provider;
    findUserByName (query: string, users: T[]): T | null;
    getAllUsers (): Promise<T[]>;
    convertToReviewer (user: T): Partial<IReviewer>;
    getUserName (user: T): string;
}
