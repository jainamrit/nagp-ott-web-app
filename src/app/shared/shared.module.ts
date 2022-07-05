import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { ErrorComponent } from './components/error/error.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied/access-denied.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
    TextareaComponent,
    NotificationsComponent,
    AccessDeniedComponent,
    MovieCardComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, CoreModule, FormsModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
    TextareaComponent,
    NotificationsComponent,
    AccessDeniedComponent,
    MovieCardComponent,
    LoaderComponent,
  ],
})
export class SharedModule { }
