import { Injectable } from '@angular/core';
import { Notification } from './notification.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationCount: number = 0;
  $notificationCount: BehaviorSubject<number> = new BehaviorSubject(this.notificationCount);

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.init().then(count => {
      this.notificationCount = count;
      this.$notificationCount.next(this.notificationCount);
    });
  }

  private notificationsCollectionRef() {
    return this.db.firestore.collection('users').doc(this.authService.userId).collection('notifications');
  }

  /**
   * Load all current notifications from db
   */
  async getNotifications() {
    try {
      const docs = await this.notificationsCollectionRef().limit(10).get();
      let notifications = [];
      docs.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      return notifications;
    } catch(err) {
      throw err;
    }
  }

  /**
   * Creates a new notification and stored it in db
   * @param notification A notification object
   */
  async createNotification(notification: Notification) {
    try {
      this.notificationCount += 1;
      this.$notificationCount.next(this.notificationCount);
      return await this.notificationsCollectionRef().add(notification);
    } catch(err) {
      throw err;
    }
  }

  /**
   * Deletes a single notification from db
   * @param notifId unique ID of the notification
   */
  async deleteNotification(notifId) {
    try {
      await this.notificationsCollectionRef().doc(notifId).delete();
      this.notificationCount -= 1;
      this.$notificationCount.next(this.notificationCount);
    } catch(err) {
      throw err;
    }
  }

  /**
   * Marks all notifications passed as read
   * @param notifications An arry of notifications to mark as read
   */
  async markAsRead(notifications) {
    try {
      this.notificationCount = 0;
      this.$notificationCount.next(this.notificationCount);
      await notifications.forEach(notification => {
        this.notificationsCollectionRef().doc(notification.id).update({ unread: false });
      });
    } catch(err) {
      throw err;
    }
  }

  private async init() {
    try {
      const notifications = await this.notificationsCollectionRef().where('unread', "==", true).get();
      if (notifications.docs.length > 0) {
        return notifications.docs.length;
      }
      return 0;
    } catch(err) {
      throw err;
    }
  }

}
