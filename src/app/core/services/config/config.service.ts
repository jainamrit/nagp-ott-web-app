import { Injectable } from '@angular/core';
import { IConfig } from '../../Interfaces/config/IConfig';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  /**
   * Config  of config service
   */
  private config: IConfig;

  /**
   * Creates an instance of config service.
   */
  constructor() {
    const config = sessionStorage.getItem('configSettings') || '{}';
    this.config = JSON.parse(config);
  }

  /**
   * Gets api url
   * @returns api url
   */
  public getApiUrl(): string {
    return this.config.apiUrl;
  }
}
