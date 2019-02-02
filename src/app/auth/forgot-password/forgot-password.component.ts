import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  links: object[];
  isSubmitted: boolean = false;
  atWork: boolean = false;
  err: { show: boolean, message?: string } = { show: false };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Login', route: '/auth/login' },
      { title: 'Home', route: '/' }
    ];
  }

  async onSubmit(form: NgForm) {
    this.atWork = true;
    this.err = { show: false };
    try {
      await this.authService.forgotPassword(form.value);
      this.atWork = false;
    } catch(err) {
      this.atWork = false;
      this.err = { show: true, message: err.message };
    }
    if (!this.err.show) {
      this.showComplete();
    }
  }

  showComplete() {
    this.isSubmitted = true;
  }

  sendAgain() {
    this.isSubmitted = false;
    this.err = { show: false };
  }

}
