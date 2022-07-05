/**
 * Iregistration input
 */
export interface IRegistrationInput {
  /**
   * id
   */
  id?: string;
  /**
   * fullName
   */
  fullName?: string;
  /**
   * email
   */
  email?: string;
  /**
   * confirmPassword
   */
  confirmPassword?: string;
  /**
   * password
   */
  password?: string;
  /**
   * isAdmin
   */
  isAdmin?: boolean;
  /**
   * optSubscription
   */
  optSubscription?: boolean;
}
