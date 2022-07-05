import { IUserOptionInput } from './IUserOptionInput';

/**
 * User option input
 */
export class UserOptionInput implements IUserOptionInput {
  /**
   * Creates an instance of user option input.
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
