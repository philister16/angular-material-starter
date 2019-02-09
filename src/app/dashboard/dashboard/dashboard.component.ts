import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
