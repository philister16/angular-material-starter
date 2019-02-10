import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  atWork: boolean;
  mode: string;
  actionCode: string;
  heading: string;
  timer: number;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.doAction(this.activatedRoute.snapshot.queryParams);    
  }

  doAction({ mode, oobCode } = this.activatedRoute.snapshot.queryParams) {
    this.actionCode = oobCode;
    switch(mode) {
      case 'verifyEmail':
        this.heading = 'Verify Email';
        this.mode = mode;
        this.verifyEmail(oobCode);
        break;
      case 'resetPassword':
        this.heading = 'Reset Password';
        this.mode = mode;
        break;
      case 'recoverEmail':
        this.heading = 'Recover Email';
        this.mode = mode;
        this.recoverEmail(oobCode);
        break;
      default:
        this.error('Something has gone wrong.', '/');
    }
  }

  async verifyEmail(actionCode) {
    try {
      await this.authService.verifyEmail(actionCode);
      this.success('Your email has been verified successfully.', '/user');
    } catch(err) {
      console.log('ActionComponent#verifyEmail:', err);
      this.error(err.message, '/user');
    }
  }

  async recoverEmail(actionCode) {
    try {
      await this.authService.recoverEmail(actionCode);
      this.success('Your email was restored successfully.', '/user');
    } catch(err) {
      console.log('ActionComponent#recoverEmail:', err);
      this.error(err.message, '/');
    }
  }

  onNewPassword(newPassword) {
    this.atWork = true;
    this.resetPassword(this.actionCode, newPassword)
  }

  async resetPassword(actionCode, newPassword) {
    try {
      await this.authService.resetPassword(actionCode, newPassword);
      this.atWork = false;
      this.router.navigateByUrl('/auth/login');
    } catch(err) {
      console.log('ActionComponent#resetPassword:', err);
      this.atWork = false;
      this.error('Your password could not be reset.', '/');
    }
  }

  navigationCountdown(time: number, url: string) {
    this.timer = time;
    const countdown = setInterval(() => {
      if (time > 0) {
        this.timer -= 1;
        time -= 1;
      } else {
        clearInterval(countdown);
        this.router.navigateByUrl(url);
      }
    }, time * 100);
  }

  isMode(mode: string): boolean {
    if (this.mode === mode) return true;
    return false;
  }

  error(message: string, url: string) {
    this.mode = 'error';
    this.message = message;
    this.navigationCountdown(9, url);
  }

  success(message: string, url: string) {
    this.mode = 'success';
    this.message = message;
    this.navigationCountdown(9, url);
  }

}
