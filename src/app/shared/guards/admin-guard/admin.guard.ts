import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routes } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  /**
   * Creates an instance of admin guard.
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
    if (loggeduser && loggeduser.id && loggeduser.isAdmin) {
      return true;
    } else {
      this.router.navigate([Routes.ACCESS_DENIED]);
      return false;
    }
  }
}
