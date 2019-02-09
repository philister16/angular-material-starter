import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Output() credentials = new EventEmitter<{ oldPassword: string, newPassword: string } | null>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.credentials.emit(form.value);
  }

  onCancel() {
    this.credentials.emit(null);
  }
}
