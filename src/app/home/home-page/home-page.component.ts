import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routes } from 'src/app/app.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  /**
   * Gets whether is user logged
   */
  public get isUserLogged(): boolean {
    const sessionUser = sessionStorage.getItem('loggedUser') || '{}';
    const loggedUser = JSON.parse(sessionUser);
    if (loggedUser && loggedUser.id) {
      return true;
    }
    return false;
  }

  /**
   * Creates an instance of home page component.
   * @param router
   */
  constructor(private router: Router) { }

  /**
   * Signs in
   */
  public signIn(): void {
    this.router.navigate([Routes.LOGIN]);
  }

  /**
   * Redirects to movie store
   */
  public redirectToMovieStore(): void {
    this.router.navigate([Routes.STORE]);
  }

  /**
   * Redirects tomovies or shows routes
   * @param type
   */
  public redirectTOMoviesOrShowsRoutes(type: string): void {
    if (type === 'movie') {
      this.router.navigate(['/home/search'], { queryParams: { movies: type } });
    } else if (type === 'show') {
      this.router.navigate(['/home/search'], { queryParams: { shows: type } });
    }
  }
}
