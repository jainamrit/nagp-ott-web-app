import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Routes } from '../../app.constants';
import { ILoginOutput } from '../../core/Interfaces/login/ILoginOutput';
import { IUploadMovieOutput } from '../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { IUserOptionOutput } from '../../core/Interfaces/user-options/IUserOptionOutput';
import { SearchMovieService } from '../../home/services/search-movie/search-movie.service';
import { UserOptionsService } from '../services/user-options/user-options.service';

@Component({
  selector: 'app-user-movies-list',
  templateUrl: './user-movies-list.component.html',
  styleUrls: ['./user-movies-list.component.css'],
})
export class UserMoviesListComponent implements OnInit {
  /**
   * List type of user movies list component
   */
  public listType = '';

  /**
   * User  of user movies list component
   */
  private user?: ILoginOutput;

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   * Movies list of user movies list component
   */
  public moviesList?: IUploadMovieOutput[];

  /**
   * Filter user options of user movies list component
   */
  private filterUserOptions?: IUserOptionOutput[];

  /**
   * Notification text of user movies list component
   */
  public notificationText = '';

  /**
   * Show notification of user movies list component
   */
  public showNotification = false;

  /**
   * Gets heading
   */
  public get heading(): string {
    return `${this.listType} movies `;
  }

  /**
   * Creates an instance of user movies list component.
   * @param activatedRoute
   * @param searchMovieService
   * @param userOptionsService
   * @param router
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchMovieService: SearchMovieService,
    private readonly userOptionsService: UserOptionsService,
    private readonly router: Router
  ) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.activatedRoute.queryParamMap.subscribe((data: Params) => {
      this.listType = '';
      this.isLoading = true;
      this.listType = data.params.type;
      this.userMovieslist();
    });
  }

  /**
   * Users movieslist
   */
  private userMovieslist(): void {
    const moviesList = this.searchMovieService.searchMovies();
    const userOptions = this.userOptionsService.getUserOptions();
    this.isLoading = true;
    this.clearData();
    forkJoin([userOptions, moviesList]).subscribe(
      (data) => {
        if (data[0] && data[0].length > 0) {
          const userOptions = data[0].filter((x) => x.userid && this.user && x.userid === this.user.id);
          if (this.listType && this.listType === 'favorite') {
            this.filterUserOptions = userOptions.filter((x) => x.favorite && x.favorite.length > 0);
            if (this.filterUserOptions && this.filterUserOptions.length > 0 && data[1] && data[1].length > 0) {
              this.moviesList = data[1].filter((x) => {
                if (this.filterUserOptions && this.filterUserOptions.find((y) => y.favorite === x.id)) {
                  return x;
                } else {
                  return undefined;
                }
              });
            }
          }
          if (this.listType && this.listType === 'watchlater') {
            this.filterUserOptions = userOptions.filter((x) => x.watchLater && x.watchLater.length > 0);
            if (this.filterUserOptions && this.filterUserOptions.length > 0 && data[1] && data[1].length > 0) {
              this.moviesList = data[1].filter((x) => {
                if (this.filterUserOptions && this.filterUserOptions.find((y) => y.watchLater === x.id)) {
                  return x;
                } else {
                  return undefined;
                }
              });
            }
          }
          if (this.listType && this.listType === 'watched') {
            this.filterUserOptions = userOptions.filter((x) => x.watched && x.watched.length > 0);
            if (this.filterUserOptions && this.filterUserOptions.length > 0 && data[1] && data[1].length > 0) {
              this.moviesList = data[1].filter((x) => {
                if (this.filterUserOptions && this.filterUserOptions.find((y) => y.watched === x.id)) {
                  return x;
                } else {
                  return undefined;
                }
              });
            }
          }
          if (this.moviesList && this.moviesList.length === 0) {
            this.showNotification = true;
            this.notificationText = `No ${this.listType} movies found.`;
          }
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  /**
   * Closes notification
   * @param value
   */
  public closeNotification(value: boolean): void {
    if (value) {
      this.notificationText = '';
      this.showNotification = false;
      this.router.navigate([Routes.HOME]);
    }
  }

  /**
   * Shows movie details
   * @param [event]
   */
  public showMovieDetails(event?: IUploadMovieOutput): void {
    if (event) {
      this.router.navigate(['movies/', event.id]);
    }
  }

  /**
   * Clears data
   */
  private clearData(): void {
    this.filterUserOptions = [];
    this.moviesList = [];
    this.showNotification = false;
    this.notificationText = '';
  }
}
