import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Routes } from '../../../../app.constants';
import { ILoginOutput } from '../../../../core/Interfaces/login/ILoginOutput';
import { AuthenticationHelper } from '../../../../shared/helper/Authentication.hepler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  /**
   * Determines whether admin is
   */
  public isAdmin = false;

  /**
   * Logged user of navbar component
   */
  public loggedUser?: ILoginOutput;

  /**
   * Selected tab of navbar component
   */
  public selectedTab = Routes.HOME;

  /**
   * Search term of navbar component
   */
  public searchTerm: string = '';

  /**
   * Gets whether is user logged
   */
  public get isUserLogged(): boolean {
    return this.loggedUser && this.loggedUser.id ? true : false;
  }

  /**
   *
   * @param router
   */
  constructor(private router: Router) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedTab = event.urlAfterRedirects;
      }
    });
    AuthenticationHelper.getLoggedUser().subscribe((data) => {
      if (data) {
        this.loggedUser = data;
        this.isAdmin = this.loggedUser.isAdmin as boolean;
      } else {
        this.loggedUser = undefined;
        this.isAdmin = false;
      }
    });
  }

  /**
   * Logs out
   */
  public logOut(): void {
    AuthenticationHelper.clearLoggedUser();
    this.router.navigate([Routes.HOME]);
  }

  /**
   * Navigates to other routes
   * @param route
   */
  public navigateToOtherRoutes(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Navigates to other routes with query params
   * @param route
   * @param queryparamValue
   */
  public navigateToOtherRoutesWithQueryParams(route: string, queryparamValue: string): void {
    this.router.navigate([route], { queryParams: { type: queryparamValue } });
  }

  /**
   * Searchs term change
   */
  public searchTermChange(): void {
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.router.navigate(['home/search'], {
        queryParams: { term: this.searchTerm },
      });
    }
  }

  /**
   * Searchs with category
   * @param category
   */
  public searchWithCategory(category: string): void {
    this.router.navigate(['home/search'], {
      queryParams: { category: category },
    });
  }
}
