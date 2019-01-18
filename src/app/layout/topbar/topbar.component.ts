import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() menuChange = new EventEmitter();
  mainMenu;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.mainMenu = this.menuService.getMenu('main');
  }

  onMenuClick() {
    this.menuChange.emit();
  }

}
