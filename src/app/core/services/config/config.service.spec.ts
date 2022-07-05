import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { mockConfigData, mockConfigService } from './config.service.mock';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return correct apiUrl', () => {
    const service = TestBed.get(ConfigService);
    service.config = mockConfigData
    expect(service.getApiUrl()).toEqual(mockConfigData.apiUrl)
  });
});
