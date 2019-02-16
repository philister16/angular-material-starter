import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from 'src/app/menu/menu.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() menuChange = new EventEmitter();
  mainMenu;
  notifications: number;

  constructor(private menuService: MenuService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.mainMenu = this.menuService.getMenu('main');
    this.notificationsService.notificationCheck().then(result => this.notifications = result);
  }

  onMenuClick() {
    this.menuChange.emit();
  }

  onNotificationRouteClick() {
    this.notifications = null;
  }

}
