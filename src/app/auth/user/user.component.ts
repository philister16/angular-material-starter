import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/layout/loader/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  view: string;
  user: User;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private loaderService: LoaderService,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userInfo;
  }

  toggleView(view?: 'changeEmail' | 'changePassword' | 'updateProfile') {
    this.view = view;
  }

  async onUserUpdate(user: User) {
    if (user !== null) {
      try {
        this.loaderService.start();
        await this.userService.updateUser(user);
        this.toggleView();
        this.loaderService.stop();
      } catch(err) {
        console.log('UserComponent#onUserUpdate:', err);
        this.loaderService.stop();
      }
    } else {
      this.toggleView();
    }
  }

  async onPasswordChange(form: { oldPassword: string, newPassword: string } | null) {
    if (form === null) {
      this.toggleView();
    } else {
      const { oldPassword, newPassword } = form;
      console.log(oldPassword, newPassword);
      try {
        this.loaderService.start();
        await this.authService.updatePassword(oldPassword, newPassword);
        this.toggleView();
        this.loaderService.stop();
      } catch(err) {
        console.log('UserComponent#onPasswordChange:', err);
        this.loaderService.stop();
      }
    }
  }

  async onEmailChange(cred: { password: string, newEmail: string } | null) {
    if (cred === null) {
      this.toggleView();
    } else {
      try {
        this.loaderService.start();
        await this.authService.updateEmail(cred.password, cred.newEmail);
        this.user.email = cred.newEmail;
        this.toggleView();
        this.loaderService.stop();
      } catch(err) {
        console.log('UserComponent#onEmailChange:', err);
        this.loaderService.stop();
      }
    }
  }

}
