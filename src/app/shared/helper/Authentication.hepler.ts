import { BehaviorSubject, Observable } from 'rxjs';
import { LoginOutput } from '../../core/Interfaces/login/LoginOutput';

/**
 * Authentication helper
 */
export class AuthenticationHelper {
  /**
   * Store logged user of authentication helper
   */
  private static storeLoggedUser = new BehaviorSubject<LoginOutput | undefined>(
    undefined
  );

  /**
   * Sets logged user
   * @param [user]
   */
  public static setLoggedUser(user?: LoginOutput) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    this.storeLoggedUser.next(user);
  }

  /**
   * Gets logged user
   * @returns logged user
   */
  public static getLoggedUser(): Observable<LoginOutput> {
    return this.storeLoggedUser as Observable<LoginOutput>;
  }

  /**
   * Sets logged user from storage
   */
  public static setLoggedUserFromStorage(): void {
    const user = sessionStorage.getItem('loggedUser') || '{}';
    const storedUser = JSON.parse(user);
    this.storeLoggedUser.next(storedUser);
  }

  /**
   * Clears logged user
   */
  public static clearLoggedUser(): void {
    sessionStorage.removeItem('loggedUser');
    this.storeLoggedUser.next(undefined);
  }
}
