import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input() type: string;
  @Input() color: string;
  @Input() disabled: boolean;
  @Input() state: boolean;

  constructor() { }

  ngOnInit() {
  }

}
