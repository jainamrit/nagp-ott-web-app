import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MoviesStoreComponent } from './movies/movies-store/movies-store.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied/access-denied.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'movies',
    component: MoviesStoreComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
