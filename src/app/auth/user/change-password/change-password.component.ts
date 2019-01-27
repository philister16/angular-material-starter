import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  @Output() newPassword = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const password = form.controls['newPassword'].value;
    this.newPassword.emit(password);
  }
}
