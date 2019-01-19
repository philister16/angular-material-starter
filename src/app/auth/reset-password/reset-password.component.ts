import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  links: object[];

  constructor() { }

  ngOnInit() {
    this.links = this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Login', route: '/auth/login' },
      { title: 'Home', route: '/' }
    ];
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.resetForm();
  }

}
