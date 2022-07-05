import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../../app.constants';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  /**
   * Creates an instance of error component.
   * @param router
   */
  constructor(private router: Router) { }

  /**
   * Redirects to home
   */
  public redirectToHome(): void {
    this.router.navigate([Routes.HOME]);
  }
}
