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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Login', route: '/auth/login' },
      { title: 'Home', route: '/' }
    ];
  }

  async onSubmit(form: NgForm) {
    console.log(form.value);
    try {
      const state = await this.authService.forgotPassword(form.value);
      if (state) {
        this.isSubmitted = state;
        form.resetForm();
      }
    } catch(err) {
      console.log('authService#onSubmit:', err);
    }
  }

  sendAgain() {
    this.isSubmitted = false;
  }

}
