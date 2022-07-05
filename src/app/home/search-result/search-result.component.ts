import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Routes } from '../.././app.constants';
import { IUploadMovieOutput } from '../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { SearchMovieService } from '../services/search-movie/search-movie.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  /**
   * Search result of search result component
   */
  public searchResult?: IUploadMovieOutput[];

  /**
   * Search term of search result component
   */
  public searchTerm = '';

  /**
   * Notification text of search result component
   */
  public notificationText = '';

  /**
   * Show notification of search result component
   */
  public showNotification = false;

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   * Search type of search result component
   */
  private searchType = '';

  /**
   * Creates an instance of search result component.
   * @param activatedRoute
   * @param searchService
   * @param router
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchMovieService,
    private readonly router: Router
  ) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((data: Params) => {
      this.isLoading = true;
      if (data.params.term) {
        this.searchType = 'searchTerm';
        this.searchMovies(data.params.term);
        this.searchTerm = data.params.term;
      }
      if (data.params.category) {
        this.searchType = 'category';
        this.searchMovies(data.params.category);
        this.searchTerm = data.params.category;
      }
      if (data.params.movies) {
        this.searchType = 'movies';
        this.searchMovies(data.params.movies);
        this.searchTerm = data.params.movies;
      }
      if (data.params.shows) {
        this.searchType = 'shows';
        this.searchMovies(data.params.shows);
        this.searchTerm = data.params.shows;
      }
    });
  }

  /**
   * Searchs movies
   * @param searchTerm
   */
  private searchMovies(searchTerm: string): void {
    this.notificationText = '';
    this.showNotification = false;
    this.searchService.searchMovies().subscribe((data: IUploadMovieOutput[]) => {
      if (data) {
        this.searchResult = data.filter((x) => {
          if (this.searchCriteria(searchTerm, x) && this.searchType === 'searchTerm') {
            return x;
          } else if (this.categorySFilterCriteria(searchTerm, x) && this.searchType === 'category') {
            return x;
          }
          else if (this.onlyMoviesOrShows(searchTerm, x) && this.searchType === 'movies') {
            return x;
          }
          else if (this.onlyMoviesOrShows(searchTerm, x) && this.searchType === 'shows') {
            return x;
          }
          return undefined;
        });
        if (this.searchResult.length === 0) {
          this.showNotification = true;
          if (this.searchType === 'searchTerm') {
            this.notificationText = 'Sorry, cannot found any movie or show related to search term';
          } else if (this.searchType === 'category') {
            this.notificationText = 'Sorry, cannot found any movie or show related to category';
          } else if (this.searchType === 'movies') {
            this.notificationText = 'Sorry, cannot found movies';
          } else if (this.searchType === 'shows') {
            this.notificationText = 'Sorry, cannot found shows';
          }
        }
        this.isLoading = false;
        this.searchType = '';
      }
    });
  }

  /**
   * Searchs criteria
   * @param searchTerm
   * @param [searchMovie]
   * @returns true if criteria
   */
  private searchCriteria(searchTerm: string, searchMovie?: IUploadMovieOutput): boolean {
    if (searchMovie && searchTerm) {
      if (
        (searchMovie.description && searchMovie.description.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (searchMovie.title && searchMovie.title.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (searchMovie.name && searchMovie.name.toUpperCase().includes(searchTerm.toUpperCase())) ||
        (searchMovie.genre && searchMovie.genre.toUpperCase().includes(searchTerm.toUpperCase()))
      ) {
        return true;
      }
    }
    return false;
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
   * Categorys sfilter criteria
   * @param category
   * @param [movie]
   * @returns true if sfilter criteria
   */
  private categorySFilterCriteria(category: string, movie?: IUploadMovieOutput): boolean {
    if (movie && category) {
      if (movie.genre && movie.genre.toUpperCase() === category.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Onlys movies or shows
   * @param type
   * @param [movie]
   * @returns true if movies or shows
   */
  private onlyMoviesOrShows(type: string, movie?: IUploadMovieOutput): boolean {
    if (movie && type) {
      if (movie.type && movie.type.toUpperCase() === type.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
}
