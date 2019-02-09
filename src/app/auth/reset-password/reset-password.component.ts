import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() atWork: boolean = false;
  @Output() newPassword = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { password } = form.value;
    this.newPassword.emit(password);
  }

}
