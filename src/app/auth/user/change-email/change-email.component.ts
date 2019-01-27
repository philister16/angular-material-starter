import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  @Input() oldEmail: string;
  @Output() newEmail = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.controls['email'].value;
    this.newEmail.emit(email);
  }

}
