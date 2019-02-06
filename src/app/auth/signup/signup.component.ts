import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  atWork: boolean = false;
  err: { show: boolean, message?: string } = { show: false };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.atWork = true;
    this.err = { show: false };
    try {
      await this.authService.signUp(form.value);
      this.atWork = false;
    } catch(err) {
      this.atWork = false;
      this.err = { show: true, message: err.message }
    }
  }

}
