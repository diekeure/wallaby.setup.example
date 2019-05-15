import { Component, HostBinding, Input } from '@angular/core';
import { BadgePersonInterface } from '../person-badge/person-badge.component';
import { HumanDateTimePipe } from '../utils/pipes/human-date-time/human-date-time.pipe';

export interface NotificationItemInterface {
  id?: number;
  icon: string;
  person?: BadgePersonInterface;
  titleText: string;
  link: string;
  notificationText?: string;
  notificationDate: Date;
  accented?: boolean;
  read?: boolean;
}
@Component({
  selector: 'campus-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [HumanDateTimePipe]
})
export class NotificationComponent {
  @Input() icon: string;
  @Input() person: BadgePersonInterface;
  @Input() titleText: string;
  @Input() notificationText: string;
  @Input() notificationDate: Date;
  @Input() accented: boolean;
  @Input() read = true;
  //tslint:disable-next-line:no-input-rename
  @Input('routerLink') link: string[];

  @HostBinding('class.ui-notification')
  get isNotification() {
    return true;
  }
  @HostBinding('class.ui-notification--accent')
  get isAccented() {
    return this.accented;
  }
  @HostBinding('class.ui-notification--unread')
  get isUnread() {
    return !this.read;
  }
}
