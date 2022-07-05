import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUploadMovieOutput } from '../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { SearchMovieService } from '../../home/services/search-movie/search-movie.service';

@Component({
  selector: 'app-movies-store',
  templateUrl: './movies-store.component.html',
  styleUrls: ['./movies-store.component.css'],
})
export class MoviesStoreComponent {
  /**
   * Movies list of movies store component
   */
  public moviesList?: IUploadMovieOutput[];

  /**
   * Drama movies of movies store component
   */
  public dramaMovies?: IUploadMovieOutput[];

  /**
   * Action movies of movies store component
   */
  public actionMovies?: IUploadMovieOutput[];

  /**
   * Suspense movies of movies store component
   */
  public suspenseMovies?: IUploadMovieOutput[];

  /**
   * Romance movies of movies store component
   */
  public romanceMovies?: IUploadMovieOutput[];

  /**
   * Comedy movies of movies store component
   */
  public comedyMovies?: IUploadMovieOutput[];

  /**
   * Horror movies of movies store component
   */
  public horrorMovies?: IUploadMovieOutput[];

  /**
   * Shows  of movies store component
   */
  public shows?: IUploadMovieOutput[];

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   * Creates an instance of movies store component.
   * @param searchMoviesService
   * @param router
   */
  constructor(private readonly searchMoviesService: SearchMovieService, private readonly router: Router) {
    this.getAllMovies();
  }

  /**
   * Gets all movies
   */
  private getAllMovies(): void {
    this.isLoading = true;
    this.searchMoviesService.searchMovies().subscribe(
      (data: IUploadMovieOutput[]) => {
        if (data) {
          this.moviesList = data;
          this.filterMovies();
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  /**
   * Filters movies
   */
  private filterMovies(): void {
    if (this.moviesList) {
      this.dramaMovies = this.moviesList.filter((x) => x.genre === 'Drama' && x.type === 'Movie');
      this.horrorMovies = this.moviesList.filter((x) => x.genre === 'Horror' && x.type === 'Movie');
      this.romanceMovies = this.moviesList.filter((x) => x.genre === 'Romance' && x.type === 'Movie');
      this.suspenseMovies = this.moviesList.filter((x) => x.genre === 'Suspense' && x.type === 'Movie');
      this.comedyMovies = this.moviesList.filter((x) => x.genre === 'Comedy' && x.type === 'Movie');
      this.actionMovies = this.moviesList.filter((x) => x.genre === 'Action' && x.type === 'Movie');
      this.shows = this.moviesList.filter((x) => x.type === 'Show');
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
}
