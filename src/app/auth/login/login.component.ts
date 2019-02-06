import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  atWork: boolean = false;
  errMsg: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.atWork = true;
    this.errMsg = false;
    try {
      await this.authService.login(form.value);
      this.atWork = false;
    } catch(err) {
      this.atWork = false;
      this.errMsg = true;
    }
  }

}
