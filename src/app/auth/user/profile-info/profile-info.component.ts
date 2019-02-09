import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.interface';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userInfo;

  constructor() { }

  ngOnInit() {
  }

}
