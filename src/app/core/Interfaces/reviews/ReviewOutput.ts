import { IReviewOutput } from './IReviewOutput';

/**
 * Review output
 */
export class ReviewOutput implements IReviewOutput {
  /**
   *
   * @param id
   * @param movieId
   * @param review
   */
  constructor(public id?: string, public movieId?: string, public review?: string) { }
}
