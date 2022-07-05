import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUploadMovieInput } from '../../../core/Interfaces/upload-movie/IUploadMovieInput';
import { IUploadMovieOutput } from '../../../core/Interfaces/upload-movie/IUploadMovieOutput';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class UploadMovieService {
  /**
   * Creates an instance of upload movie service.
   * @param configService
   * @param http
   */
  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  /**
   * Uploads movie
   * @param payLoad
   * @returns movie
   */
  public uploadMovie(payLoad: IUploadMovieInput): Observable<IUploadMovieOutput> {
    return this.http.post<IUploadMovieOutput>(`${this.configService.getApiUrl()}movies`, payLoad);
  }
}
