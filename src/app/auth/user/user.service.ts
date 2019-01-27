import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    email: 'tester1@rhinerock.com',
    firstname: 'Tester',
    lastname: 'One',
    bio: 'This is some info about the user.'
  };
  userSubject = new BehaviorSubject<User>(this.user);

  constructor() { }

  updateUser(user: User) {
    this.user = { ...this.user, ...user };
    this.userSubject.next(this.user);
  }

}
