import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  isUpdating: boolean = false;
  isChangingEmail: boolean = false;
  isChangingPassword: boolean = false;
  user: User;
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userInfo().subscribe(user => {
      this.user = user;
    });
  }

  toggleView(view: 'email' | 'password' | 'profile') {
    switch(view) {
      case 'profile':
        this.isUpdating = !this.isUpdating;
        break;
      case 'email':
        this.isChangingEmail = !this.isChangingEmail;
        break;
      case 'password':
        this.isChangingPassword = !this.isChangingPassword;
        break;
    }
  }

  onChangeEmail() {
    this.isChangingEmail = true;
  }

  onEmailChanged(newEmail: string | null) {
    this.isChangingEmail = false;
    if (newEmail) {
      this.userService.updateUser({ email: newEmail});
    }
  }

  onChangePassword() {
    this.isChangingPassword = true;
  }

  onPasswordChanged(newPassword: string | null) {
    this.isChangingPassword = false;
    if (newPassword) {
      this.userService.updateUser({ password: newPassword });
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
