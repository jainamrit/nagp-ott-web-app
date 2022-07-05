import { IRegistrationOutput } from './IRegistrationOutput';
/**
 * Registration output
 */
export class RegistrationOutput implements IRegistrationOutput {
  /**
   * Creates an instance of registration output.
   * @param [id]
   * @param [fullName]
   * @param [email]
   * @param [optSubscription]
   */
  constructor(
    public id?: string,
    public fullName?: string,
    public email?: string,
    public optSubscription?: boolean
  ) { }

  /**
   * Froms dto
   * @param res
   * @returns dto
   */
  public static fromDTO(res: IRegistrationOutput): RegistrationOutput {
    const output = new RegistrationOutput();
    output.email = res.email;
    output.fullName = res.fullName;
    output.id = res.id;
    output.optSubscription = res.optSubscription;
    return output;
  }
}
