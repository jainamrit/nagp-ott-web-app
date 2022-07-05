import { IConfig } from './IConfig';

/**
 * Config
 */
export class Config implements IConfig {
  /**
   * Creates an instance of config.
   * @param apiUrl
   */
  constructor(public apiUrl: string) { }
}
