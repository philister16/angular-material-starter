import { Injectable } from '@angular/core';
import { AppMenu, MAIN_MENU, SUB_MENU, FOOTER_MENU } from './app-menus';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  mainMenu: AppMenu[];
  subMenu: AppMenu[];
  footerMenu: AppMenu[];

  constructor() {
    this.mainMenu = MAIN_MENU;
    this.subMenu = SUB_MENU;
    this.footerMenu = FOOTER_MENU;
  }

  getMenu(menu: string): AppMenu[] {
    switch(menu) {
      case 'main':
        return this.mainMenu;
      case 'sub':
        return this.subMenu;
      case 'footer':
        return this.footerMenu;
      default:
        return null;
    }
  }
}
