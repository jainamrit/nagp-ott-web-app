import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';
import { OptSubscriptionComponent } from './opt-subscription/opt-subscription.component';
import { AuthUserGuard } from '../shared/guards/auth-user-guard/auth-user.guard';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'search',
        component: SearchResultComponent,
      },
      {
        path: 'subscribe',
        component: OptSubscriptionComponent,
        canActivate: [AuthUserGuard],
      }
    ],
  },
];
@NgModule({
  declarations: [HomePageComponent, SearchResultComponent, OptSubscriptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [HomePageComponent],
})
export class HomeModule { }
