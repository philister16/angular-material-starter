import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string;
  private user: User;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.user = { email: user.email };
      }
    });
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
    try {
      await this.db.collection('users').doc(this.userId).update(user);
    } catch(err) {
      console.log('UserService#updateUser:', err);
    }
  }

}
