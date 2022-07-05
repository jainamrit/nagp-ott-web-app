import { IUploadMovieInput } from './IUploadMovieInput';

/**
 * Upload movie input
 */
export class UploadMovieInput implements IUploadMovieInput {
  /**
   * Creates an instance of upload movie input.
   * @param [id]
   * @param [name]
   * @param [title]
   * @param [description]
   * @param [language]
   * @param [genre]
   * @param [imdbRating]
   * @param [imageUrl]
   * @param [type]
   * @param [isPrime]
   */
  constructor(
    public id?: string,
    public name?: string,
    public title?: string,
    public description?: string,
    public language?: string,
    public genre?: string,
    public imdbRating?: string,
    public imageUrl?: string,
    public type?: string,
    public isPrime?: boolean
  ) { }
}
