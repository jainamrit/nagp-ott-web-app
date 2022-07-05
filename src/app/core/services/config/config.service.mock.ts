import { of } from "rxjs";
import { IConfig } from "../../Interfaces/config/IConfig";
import { ConfigService } from "./config.service";

export const mockConfigData: IConfig = {
  apiUrl: 'test-demo'
}

export function mockConfigService(): ConfigService {
  const service = jasmine.createSpyObj('ConfigService', ['getApiUrl']);
  service.getApiUrl.and.returnValue(of(mockConfigData));
  return service;
}
