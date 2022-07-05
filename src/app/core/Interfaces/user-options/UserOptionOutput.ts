import { IUserOptionOutput } from './IUserOptionOutput';

/**
 * User option output
 */
export class UserOptionOutput implements IUserOptionOutput {
  /**
   * Creates an instance of user option output.
   * @param [id]
   * @param [userId]
   * @param [watchLater]
   * @param [favorite]
   * @param [watched]
   */
  constructor(
    public id?: string,
    public userId?: string,
    public watchLater?: string,
    public favorite?: string,
    public watched?: string
  ) { }
}
