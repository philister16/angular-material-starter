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
  atWork: boolean = false;
  err: { show: boolean, message?: string } = { show: false };

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.atWork = true;
    this.err = { show: false };
    const { password } = form.value;
    const code = this.activatedRoute.snapshot.queryParams['oobCode'];
    try {
      await this.authService.resetPassword(code, password);
      this.atWork = false;
    } catch(err) {
      this.atWork = false;
      this.err = { show: true, message: err.message };
    }
  }

}
