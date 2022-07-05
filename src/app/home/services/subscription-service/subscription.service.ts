import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginOutput } from '../../../core/Interfaces/login/ILoginOutput';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  /**
   * Creates an instance of subscription service.
   * @param configService
   * @param http
   */
  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  /**
   * Adds subscription
   * @param [id]
   * @returns subscription
   */
  public addSubscription(id?: string): Observable<ILoginOutput> {
    return this.http.patch<ILoginOutput>(`${this.configService.getApiUrl()}users/${id}`, {
      optSubscription: true,
    });
  }
}
