import { IRegistrationInput } from './IRegistrationInput';

/**
 * Registration input
 */
export class RegistrationInput implements IRegistrationInput {
  /**
   * Creates an instance of registration input.
   * @param [id]
   * @param [fullName]
   * @param [email]
   * @param [confirmPassword]
   * @param [password]
   * @param [isAdmin]
   * @param [optSubscription]
   */
  constructor(
    public id?: string,
    public fullName?: string,
    public email?: string,
    public confirmPassword?: string,
    public password?: string,
    public isAdmin?: boolean,
    public optSubscription?: boolean
  ) { }
}
