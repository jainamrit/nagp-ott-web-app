import { ILoginInput } from "./ILoginInput";

/**
 * Login input
 */
export class LoginInput implements ILoginInput {
  /**
   * Creates an instance of login input.
   * @param [email]
   * @param [password]
   * @param [isAdmin]
   */
  constructor(
    public email?: string,
    public password?: string,
    public isAdmin?: boolean
  ) { }
}
