import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../app.constants';
import { ILoginOutput } from '../.././core/Interfaces/login/ILoginOutput';
import { SubscriptionService } from '../services/subscription-service/subscription.service';

@Component({
  selector: 'app-opt-subscription',
  templateUrl: './opt-subscription.component.html',
  styleUrls: ['./opt-subscription.component.css'],
})
export class OptSubscriptionComponent {
  /**
   * User  of opt subscription component
   */
  public user?: ILoginOutput;

  /**
   * Determines whether user take subscription is
   */
  public isUserTakeSubscription = false;

  /**
   * Creates an instance of opt subscription component.
   * @param subscriptionService
   * @param router
   */
  constructor(private readonly subscriptionService: SubscriptionService, private readonly router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    if (this.user) {
      this.isUserTakeSubscription = this.user.optSubscription as boolean;
    }
  }

  /**
   * Adds subscription
   */
  public addSubscription(): void {
    if (this.user) {
      this.subscriptionService.addSubscription(this.user.id).subscribe((data) => {
        if (data) {
          this.isUserTakeSubscription = data.optSubscription as boolean;
          if (this.user) {
            this.user.optSubscription = data.optSubscription;
            sessionStorage.setItem('loggedUser', JSON.stringify(this.user));
          }
        }
      });
    }
  }

  /**
   * Redirects direct to store
   */
  public redirectDirectToStore(): void {
    this.router.navigate([Routes.STORE]);
  }
}
