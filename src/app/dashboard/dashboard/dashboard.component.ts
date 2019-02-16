import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private notificationsService: NotificationsService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

}
