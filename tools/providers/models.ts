import { Provider } from '../../src/enums';
import { IMember } from '../../src/models';

export interface IProvider<T> {
    getProviderName (): Provider;
    findUserByName (query: string, users: T[]): T | null;
    getAllUsers (): Promise<T[]>;
    convertToMember (user: T): Partial<IMember>;
    getUserName (user: T): string;
}
