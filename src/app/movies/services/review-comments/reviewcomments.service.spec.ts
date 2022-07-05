import { TestBed } from '@angular/core/testing';

import { ReviewcommentsService } from './reviewcomments.service';

describe('ReviewcommentsService', () => {
  let service: ReviewcommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewcommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
