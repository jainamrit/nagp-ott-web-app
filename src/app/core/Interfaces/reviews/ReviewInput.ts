import { IReviewInput } from "./IReviewInput";

/**
 * Review input
 */
export class ReviewInput implements IReviewInput {
  /**
   * Creates an instance of review input.
   * @param [id]
   * @param [movieId]
   * @param [review]
   */
  constructor(public id?: string, public movieId?: string, public review?: string) { }
}
