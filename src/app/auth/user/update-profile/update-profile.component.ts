import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user.interface';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @Input() user: User;
  @Output() done = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    try {
      await this.userService.updateUser(form.value);
      this.done.emit();
    } catch(err) {
      console.log('UpdateProfileComponent#onSubmit:', err);
    }
  }

  onCancel() {
    this.done.emit();
  }

}
