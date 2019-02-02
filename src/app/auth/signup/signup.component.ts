import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  links: object[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.links = [
      { title: 'Login', route: '/auth/login' },
      { title: 'Forgot password', route: '/auth/forgot-password' },
      { title: 'Home', route: '/' }
    ];
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.signUp(form.value);
    form.resetForm();
  }

}
