import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/menu/menu.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Output() menuChange = new EventEmitter();
  mainMenu;
  notificationCount: Subscription;
  counter: number | null;

  constructor(private menuService: MenuService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.mainMenu = this.menuService.getMenu('main');
    this.notificationCount = this.notificationsService.$notificationCount.subscribe(counter => {
      this.counter = counter;
    });
  }

  onMenuClick() {
    this.menuChange.emit();
  }

  ngOnDestroy() {
    this.notificationCount.unsubscribe();
  }

}
