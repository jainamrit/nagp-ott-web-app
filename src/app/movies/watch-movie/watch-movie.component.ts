import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IUploadMovieOutput } from '../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { SearchMovieService } from '../../home/services/search-movie/search-movie.service';

@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.css']
})
export class WatchMovieComponent implements OnInit {
  /**
  * Movie details of movie details component
  */
  public movieDetails?: IUploadMovieOutput;

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly searchMovieService: SearchMovieService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data.movieId) {
        this.isLoading = true;
        this.getMovieDetails(data.movieId);
      }
    });
  }

  /**
 * Gets movie details
 * @param [movieId]
 */
  private getMovieDetails(movieId?: string): void {
    this.isLoading = true;
    this.searchMovieService.searchMovies().subscribe(
      (data) => {
        if (data) {
          this.movieDetails = data.find((x) => x.id === movieId);

        }
      },
      (error) => {
        (this.isLoading = false)
      }
    )
  };

}
