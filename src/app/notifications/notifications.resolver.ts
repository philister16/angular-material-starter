import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Notification } from './notification.interface';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsResolver implements Resolve<Promise<Notification[]>> {

  constructor(private notificationsService: NotificationsService) { }

  resolve() {
    return this.notificationsService.getNotifications();
  }
}
