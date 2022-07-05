import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewInput } from '../../../core/Interfaces/reviews/IReviewInput';
import { IReviewOutput } from '../../../core/Interfaces/reviews/IReviewOutput';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewcommentsService {
  /**
   * Creates an instance of reviewcomments service.
   * @param configService
   * @param http
   */
  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  /**
   * Posts reviews
   * @param payLoad
   * @returns reviews
   */
  public postReviews(payLoad: IReviewInput): Observable<IReviewOutput> {
    return this.http.post<IReviewOutput>(`${this.configService.getApiUrl()}reviews`, payLoad);
  }

  /**
   * Gets reviews
   * @returns reviews
   */
  public getReviews(): Observable<IReviewOutput[]> {
    return this.http.get<IReviewOutput[]>(`${this.configService.getApiUrl()}reviews`);
  }
}
