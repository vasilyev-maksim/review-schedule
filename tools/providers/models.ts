import { IReviewer } from '../../src/models';

export interface IProvider {
    findReviewers (names: string[]): Promise<Partial<IReviewer>[]>;
    getAllReviewers (): Promise<Partial<IReviewer>[]>;
}
