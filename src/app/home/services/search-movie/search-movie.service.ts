import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUploadMovieOutput } from '../../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  /**
   * Creates an instance of search movie service.
   * @param configService
   * @param http
   */
  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  /**
   * Searchs movies
   * @returns movies
   */
  public searchMovies(): Observable<IUploadMovieOutput[]> {
    return this.http.get<IUploadMovieOutput[]>(`${this.configService.getApiUrl()}movies`);
  }

}
