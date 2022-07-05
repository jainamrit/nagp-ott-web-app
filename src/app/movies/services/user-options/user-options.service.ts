import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserOptionInput } from '../../../core/Interfaces/user-options/IUserOptionInput';
import { IUserOptionOutput } from '../../../core/Interfaces/user-options/IUserOptionOutput';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class UserOptionsService {
  /**
   * Creates an instance of user options service.
   * @param configService
   * @param http
   */
  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  /**
   * Updates user options
   * @param payLoad
   * @returns user options
   */
  public updateUserOptions(payLoad: IUserOptionInput): Observable<IUserOptionOutput> {
    return this.http.post<IUserOptionOutput>(`${this.configService.getApiUrl()}userOptions`, payLoad);
  }

  /**
   * Gets user options
   * @returns user options
   */
  public getUserOptions(): Observable<IUserOptionOutput[]> {
    return this.http.get<IUserOptionOutput[]>(`${this.configService.getApiUrl()}userOptions`);
  }

  /**
   * Removes user options
   * @param [id]
   * @returns user options
   */
  public removeUserOptions(id?: string): Observable<IUserOptionOutput> {
    return this.http.delete<IUserOptionOutput>(`${this.configService.getApiUrl()}userOptions/${id}`);
  }
}
