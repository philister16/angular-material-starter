import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @Input() user: User;
  @Output() updatedUser = new EventEmitter<User | null>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const updatedUser = {
      ...this.user,
      ...form.value
    }
    this.updatedUser.emit(updatedUser);
  }

  onCancel() {
    this.updatedUser.emit(null);
  }

}
