import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { UploadMoviesComponent } from './upload-movies/upload-movies.component';
import { MoviesStoreComponent } from './movies-store/movies-store.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { UserMoviesListComponent } from './user-movies-list/user-movies-list.component';
import { AdminGuard } from '../shared/guards/admin-guard/admin.guard';
import { AuthUserGuard } from '../shared/guards/auth-user-guard/auth-user.guard';
import { WatchMovieComponent } from './watch-movie/watch-movie.component';

const routes: Routes = [
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: MoviesStoreComponent,
      },
      {
        path: 'upload',
        component: UploadMoviesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'usermovieslist',
        component: UserMoviesListComponent,
        canActivate: [AuthUserGuard],
      },
      {
        path: ':movieId',
        component: MovieDetailsComponent,
      },
      {
        path: 'watch/:movieId',
        component: WatchMovieComponent,
        canActivate: [AuthUserGuard],
      },
    ],
  },
];
@NgModule({
  declarations: [
    UploadMoviesComponent,
    MoviesStoreComponent,
    MovieDetailsComponent,
    UserMoviesListComponent,
    WatchMovieComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class MoviesModule { }
