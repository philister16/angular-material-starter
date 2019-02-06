import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: Alert[];
  hasAlert: boolean = false;

  constructor(private alertService: AlertService) {
    this.alerts = this.alertService.alerts;
    if (this.alertService.alerts.length > 0) {
      this.hasAlert = true;
    }
  }

  ngOnInit() {
  }

  dismiss(alert: Alert) {
    this.alertService.dismiss(alert);
  }

  bgColor(type: string) {
    switch(type) {
      case 'warning': return 'darkgoldenrod';
      case 'error': return 'darkred';
      case 'info': return 'steelblue';
    }
  }

}
