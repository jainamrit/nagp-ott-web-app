import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  /**
   * Input  of notifications component
   */
  @Input() notificationText?: string;

  /**
   * Input  of notifications component
   */
  @Input() showNotification = false;

  /**
   * Input  of notifications component
   */
  @Input() errorNotification = false;

  /**
   * Output  of notifications component
   */
  @Output() closeClick = new EventEmitter<boolean>(false);

  /**
   * Closes notifications component
   */
  public close(): void {
    this.closeClick.emit(true);
  }
}
