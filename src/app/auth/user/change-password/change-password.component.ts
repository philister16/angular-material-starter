import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  @Output() newPassword = new EventEmitter<string | null>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const password = form.controls['newPassword'].value;
    this.newPassword.emit(password);
  }

  onCancel() {
    this.newPassword.emit(null);
  }
}
