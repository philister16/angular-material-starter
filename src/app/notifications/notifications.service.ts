import { Injectable } from '@angular/core';
import { Notification } from './notification.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  private notificationsCollectionRef() {
    return this.db.firestore.collection('users').doc(this.authService.userId).collection('notifications');
  }

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

  async createNotification(notification: Notification) {
    try {
      return await this.notificationsCollectionRef().add(notification);
    } catch(err) {
      throw err;
    }
  }

  async deleteNotification(notifId) {
    try {
      await this.notificationsCollectionRef().doc(notifId).delete();
    } catch(err) {
      throw err;
    }
  }

  async markAsRead(notifications) {
    try {
      await notifications.forEach(notification => {
        this.notificationsCollectionRef().doc(notification.id).update({ unread: false });
      });
    } catch(err) {
      throw err;
    }
  }

  async notificationCheck() {
    try {
      const notifications = await this.notificationsCollectionRef().where('unread', "==", true).get();
      if (notifications.docs.length > 0) {
        return notifications.docs.length;
      }
      return null;
    } catch(err) {
      throw err;
    }
  }

}
