import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  links: object[];

  constructor() { }

  ngOnInit() {
    this.links = [
      { title: 'Sign up', route: '/auth/signup' },
      { title: 'Forgot password', route: '/auth/forgot-password' },
      { title: 'Home', route: '/' }
    ];
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.resetForm();
  } 

}
