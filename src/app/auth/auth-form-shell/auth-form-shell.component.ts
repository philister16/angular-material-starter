import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-form-shell',
  templateUrl: './auth-form-shell.component.html',
  styleUrls: ['./auth-form-shell.component.scss']
})
export class AuthFormShellComponent implements OnInit {
  @Input() heading: string;
  @Input() links: object[];

  constructor() { }

  ngOnInit() {
  }

}
