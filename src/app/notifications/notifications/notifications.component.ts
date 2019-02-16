import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationsService: NotificationsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.notifications = this.route.snapshot.data.notifications;
    this.notificationsService.markAsRead(this.notifications);
  }

  async onDelete(notification) {
    try {
      await this.notificationsService.deleteNotification(notification.id);
      this.notifications.splice(this.notifications.indexOf(notification), 1);
    } catch(err) {
      console.log('NotificationsComponent#onDelete:', err);
    }
  }
}
