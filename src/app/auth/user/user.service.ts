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
  private userId: string = this.afAuth.auth.currentUser.uid;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  userInfo(): Observable<User> {
    return this.db.collection('users').doc(this.userId).get().pipe(
      map(doc => {
        return {
          ...doc.data()
        }
      })
    );
  }

  async updateUser(user: User) {
    const cleaned = this.removeUndefineds(user);
    try {
      await this.db.collection('users').doc(this.userId).update(cleaned);
    } catch(err) {
      throw err;
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
