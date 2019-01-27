import { Provider } from '../../src/enums';
import { IReviewer } from '../../src/models';

export interface IProvider {
    getProviderName (): Provider;
    findReviewers (names: string[]): Promise<Partial<IReviewer>[]>;
    getAllReviewers (): Promise<Partial<IReviewer>[]>;
}
