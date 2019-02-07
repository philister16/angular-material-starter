import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string;
  private user: User;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userId = this.afAuth.auth.currentUser.uid;
  }

  userInfo(): Observable<User> {
    return this.db.collection('users').doc(this.userId).get().pipe(
      map(doc => {
        return this.user = {
          ...this.user, ...doc.data()
        }
      })
    );
  }

  async updateUser(user: User) {
    const cleaned = this.removeUndefineds(user);
    try {
      await this.db.collection('users').doc(this.userId).update(cleaned);
    } catch(err) {
      console.log('UserService#updateUser:', err);
    }
  }

  private removeUndefineds(object) {
    const cleaned = {};
    for (let key in object) {
      if (object[key] != undefined) {
        cleaned[key] = object[key];
      }
    }
    return cleaned;
  }

}
