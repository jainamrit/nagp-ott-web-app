import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SearchMovieService } from './search-movie.service';
import { mockSearchService, searchMoviesMockData } from './search-movie.service.mock';
import { ConfigService } from '../../../core/services/config/config.service';
import { mockConfigService } from '../../../core/services/config/config.service.mock';

describe('SearchMovieService', () => {
  let service: SearchMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService() }]
    });
    service = TestBed.inject(SearchMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return the correct search result', () => {
    const service = TestBed.get(SearchMovieService);
    service.searchMovies().subscribe((data: any) => {
      expect(data).toEqual(searchMoviesMockData)
    })
  });
});
