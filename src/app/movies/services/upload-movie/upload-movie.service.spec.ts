import { TestBed } from '@angular/core/testing';

import { UploadMovieService } from './upload-movie.service';

describe('UploadMovieService', () => {
  let service: UploadMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
