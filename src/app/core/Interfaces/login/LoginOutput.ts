import { ILoginOutput } from './ILoginOutput';

/**
 * Login output
 */
export class LoginOutput implements ILoginOutput {
  /**
   * Creates an instance of login output.
   * @param [fullName]
   * @param [email]
   * @param [isAdmin]
   * @param [id]
   * @param [optSubscription]
   */
  constructor(
    public fullName?: string,
    public email?: string,
    public isAdmin?: boolean,
    public id?: string,
    public optSubscription?: boolean
  ) { }

  /**
   * Froms dto
   * @param res
   * @returns dto
   */
  public static fromDTO(res: ILoginOutput): LoginOutput {
    const output = new LoginOutput();
    output.email = res.email;
    output.fullName = res.fullName;
    output.id = res.id;
    output.isAdmin = res.isAdmin;
    output.optSubscription = res.optSubscription;
    return output;
  }
}
