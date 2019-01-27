import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @Input() user: User;
  @Output() userUpdated = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userUpdated.emit(form.value);
  }

}
