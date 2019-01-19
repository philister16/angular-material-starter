import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  links: object[];
  isSubmitted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Login', route: '/auth/login' },
      { title: 'Home', route: '/' }
    ];
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.isSubmitted = true;
    form.resetForm();
  }

  sendAgain() {
    this.isSubmitted = false;
  }

}
