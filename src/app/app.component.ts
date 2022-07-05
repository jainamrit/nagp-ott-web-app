import { Component, OnInit } from '@angular/core';
import { AuthenticationHelper } from './shared/helper/Authentication.hepler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * onInit
   */
  ngOnInit(): void {
    AuthenticationHelper.setLoggedUserFromStorage();
  }
}
