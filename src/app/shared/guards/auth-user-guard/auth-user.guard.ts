import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routes } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthUserGuard implements CanActivate {
  /**
   * Creates an instance of auth user guard.
   * @param router
   */
  constructor(private readonly router: Router) { }

  /**
   * Determines whether activate can
   * @param route
   * @param state
   * @returns activate
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionStorageUser = sessionStorage.getItem('loggedUser') || '{}';
    const loggeduser = JSON.parse(sessionStorageUser);
    if (loggeduser && loggeduser.id) {
      return true;
    } else {
      this.router.navigate([Routes.LOGIN]);
      return false;
    }
  }
}
