import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  @Input() image: string = 'https://randomuser.me/api/portraits/men/32.jpg';

  constructor() { }

  ngOnInit() {
  }

}
