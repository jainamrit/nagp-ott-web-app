import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchMovieService } from 'src/app/home/services/search-movie/search-movie.service';
import { mockSearchService, searchMoviesMockData } from 'src/app/home/services/search-movie/search-movie.service.mock';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';

import { MoviesStoreComponent } from './movies-store.component';

describe('MoviesStoreComponent', () => {
  let component: MoviesStoreComponent;
  let fixture: ComponentFixture<MoviesStoreComponent>;
  let route = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MoviesStoreComponent, MovieCardComponent, LoaderComponent],
      providers: [{
        provide: SearchMovieService, useValue: mockSearchService()
      },
      {
        provide: Router,
        useValue: route
      }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct data', () => {
    const service: SearchMovieService = TestBed.get(SearchMovieService);
    service.searchMovies = jasmine.createSpy('searchMovies').and.returnValues((of(searchMoviesMockData)))
    component.moviesList = searchMoviesMockData;
    service.searchMovies().subscribe((data) => {
      expect(component.moviesList).toEqual(data)
    })
  });
});
