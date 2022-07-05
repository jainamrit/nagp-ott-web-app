import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Routes } from '../../app.constants';
import { ILoginOutput } from '../../core/Interfaces/login/ILoginOutput';
import { IReviewInput } from '../../core/Interfaces/reviews/IReviewInput';
import { IReviewOutput } from '../../core/Interfaces/reviews/IReviewOutput';
import { IUploadMovieOutput } from '../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { IUserOptionInput } from '../../core/Interfaces/user-options/IUserOptionInput';
import { SearchMovieService } from '../../home/services/search-movie/search-movie.service';
import { CommonUtilities } from '../../shared/utils/common-utilities';
import { ReviewcommentsService } from '../services/review-comments/reviewcomments.service';
import { UserOptionsService } from '../services/user-options/user-options.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  /**
   * Movie details of movie details component
   */
  public movieDetails?: IUploadMovieOutput;

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   * Review comment of movie details component
   */
  public reviewComment = '';

  /**
   * Review comment output of movie details component
   */
  public reviewCommentOutput: IReviewOutput[] = [];

  /**
   * Notification text of movie details component
   */
  public notificationText = '';

  /**
   * Show notification of movie details component
   */
  public showNotification = false;

  /**
   * Determines whether movie already favorite is
   */
  public isMovieAlreadyFavorite = false;

  /**
   * Determines whether movie already watch later is
   */
  public isMovieAlreadyWatchLater = false;

  /**
   * Determines whether movie alread watched is
   */
  public isMovieAlreadWatched = false;

  /**
   * User  of movie details component
   */
  private user?: ILoginOutput;

  /**
   * Already watch later of movie details component
   */
  private alreadyWatchLater?: IUploadMovieOutput;

  /**
   * Alread favorite data of movie details component
   */
  private alreadFavoriteData?: IUploadMovieOutput;

  /**
   * Alread watched data of movie details component
   */
  private alreadWatchedData?: IUploadMovieOutput;

  /**
   * Creates an instance of movie details component.
   * @param searchMovieService
   * @param activatedRoute
   * @param reviewCommentService
   * @param router
   * @param userOptionsService
   */
  constructor(
    private readonly searchMovieService: SearchMovieService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly reviewCommentService: ReviewcommentsService,
    private readonly router: Router,
    private readonly userOptionsService: UserOptionsService
  ) { }


  /**
   * on init
   */
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
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
    const movieDetails = this.searchMovieService.searchMovies();
    const reviewList = this.reviewCommentService.getReviews();
    const userOptions = this.userOptionsService.getUserOptions();
    forkJoin([movieDetails, reviewList, userOptions]).subscribe(
      (data) => {
        if (data[0] && data[0].length > 0) {
          this.movieDetails = data[0].find((x) => x.id === movieId);
          if (data[1] && data[1].length > 0) {
            this.reviewCommentOutput = data[1].filter((x) => x.movieId === movieId);
          }
          if (data[2] && this.movieDetails && this.movieDetails.id && data[2].length > 0) {
            const userOptions = data[2].filter((x) => x.userid && this.user && x.userid === this.user.id);
            this.alreadyWatchLater = userOptions.find(
              (x) => x.watchLater && this.movieDetails && x.watchLater === (this.movieDetails.id as string)
            );
            this.alreadFavoriteData = userOptions.find(
              (x) => x.favorite && this.movieDetails && x.favorite === (this.movieDetails.id as string)
            );
            this.alreadWatchedData = userOptions.find(
              (x) => x.watched && this.movieDetails && x.watched === (this.movieDetails.id as string)
            );
            if (this.alreadyWatchLater) {
              this.isMovieAlreadyWatchLater = true;
            }
            if (this.alreadFavoriteData) {
              this.isMovieAlreadyFavorite = true;
            }
            if (this.alreadWatchedData) {
              this.isMovieAlreadWatched = true;
            }
          }
          if (!this.movieDetails) {
            this.showNotification = true;
            this.notificationText = 'No movie Details found, Please try again';
          }
          this.isLoading = false;
        } else {
          (this.isLoading = false), (this.showNotification = true);
          this.notificationText = 'No movie Details found, Please try again';
        }
      },
      (error) => {
        (this.isLoading = false), (this.showNotification = true);
        this.notificationText = 'Error while executing the request';
      }
    );
  }

  /**
   * Posts review
   */
  public postReview(): void {
    if (this.movieDetails) {
      const payLoad: IReviewInput = {
        id: CommonUtilities.generateId(),
        movieId: this.movieDetails.id,
        review: this.reviewComment,
      };
      this.reviewCommentService.postReviews(payLoad).subscribe((data: IReviewOutput) => {
        if (data) {
          this.reviewComment = '';
          this.reviewCommentOutput.push(data);
        }
      });
    }
  }

  /**
   * Closes notification
   * @param value
   */
  public closeNotification(value: boolean): void {
    if (value) {
      this.notificationText = '';
      this.showNotification = false;
      this.router.navigate([Routes.STORE]);
    }
  }

  /**
   * Updates user options
   * @param type
   */
  public updateUserOptions(type: string): void {
    if (this.user && this.user.id) {
      if (this.movieDetails) {
        const payLoad: IUserOptionInput = {
          id: CommonUtilities.generateId(),
          userid: this.user.id,
        };
        let isUser = false;
        if (this.movieDetails.id) {
          if (type === 'watchlater') {
            payLoad.watchLater = this.movieDetails.id;
          }
          if (type === 'watched') {
            payLoad.watched = this.movieDetails.id;
          }
          if (type === 'favorite') {
            payLoad.favorite = this.movieDetails.id;
          }
        }
        if (this.movieDetails.isPrime && !this.user.optSubscription) {
          this.router.navigate([Routes.SUBSCRIBE]);
        } else {
          this.userOptionsService.updateUserOptions(payLoad).subscribe((data) => {
            if (data) {
              if (type === 'watchlater') {
                this.isMovieAlreadyWatchLater = true;
                this.alreadyWatchLater = data;
              }
              if (type === 'favorite') {
                this.isMovieAlreadyFavorite = true;
                this.alreadFavoriteData = data;
              }
              if (type === 'watched') {
                this.isMovieAlreadWatched = true;
                this.alreadWatchedData = data;
                if (this.movieDetails) {
                  this.router.navigate(['movies/watch', this.movieDetails.id]);
                }
              }
            } else {
              this.isMovieAlreadyFavorite = false;
              this.isMovieAlreadyWatchLater = false;
              this.isMovieAlreadWatched = false;
            }
          });
        }
      }
    } else {
      this.router.navigate([Routes.LOGIN]);
    }
  }

  /**
   * Removes user options
   * @param type
   */
  public removeUserOptions(type: string): void {
    let id = '';
    if (type === 'watchlater' && this.isMovieAlreadyWatchLater && this.alreadyWatchLater) {
      id = this.alreadyWatchLater.id as string;
    }
    if (type === 'favorite' && this.isMovieAlreadyFavorite && this.alreadFavoriteData) {
      id = this.alreadFavoriteData.id as string;
    }
    if (type === 'watched' && this.isMovieAlreadWatched && this.alreadWatchedData) {
      id = this.alreadWatchedData.id as string;
    }
    this.userOptionsService.removeUserOptions(id).subscribe((data) => {
      if (type === 'watchlater') {
        this.isMovieAlreadyWatchLater = false;
        this.alreadyWatchLater = undefined;
      }
      if (type === 'favorite') {
        this.isMovieAlreadyFavorite = false;
        this.alreadFavoriteData = undefined;
      }
      if (type === 'watched') {
        this.isMovieAlreadWatched = false;
        this.alreadWatchedData = undefined;
      }
    });
  }

  /**
   * Splits imdbrating
   * @param [value]
   * @returns imdbrating
   */
  public splitIMDBRating(value?: string): number[] {
    if (value) {
      let starResult = []
      const star = value.split(' ')[0]
      if (star === '1') {
        starResult.push(1);
      }
      if (star === '2') {
        starResult.push(1);
        starResult.push(2);
      }
      if (star === '3') {
        starResult.push(1);
        starResult.push(2);
        starResult.push(3);
      }
      if (star === '4') {
        starResult.push(1);
        starResult.push(2);
        starResult.push(3);
        starResult.push(4);
      }
      if (star === '5') {
        starResult.push(1);
        starResult.push(2);
        starResult.push(3);
        starResult.push(4);
        starResult.push(5);
      }
      return starResult;
    }
    return []
  }
}
