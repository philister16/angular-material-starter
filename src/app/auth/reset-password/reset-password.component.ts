import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  links: object[];

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.links = this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Login', route: '/auth/login' },
      { title: 'Home', route: '/' }
    ];
  }

  async onSubmit(form: NgForm) {
    console.log(form.value);
    const { password } = form.value;
    const code = this.activatedRoute.snapshot.queryParams['oobCode'];
    try {
      await this.authService.resetPassword(code, password);
    } catch(err) {
      console.log('ResetPasswordComponent#onSubmit:', err);
    }
    form.resetForm();
  }

}
