import { Injectable } from '@angular/core';
import { AppMenu, MAIN_MENU, SUB_MENU, FOOTER_MENU, AUTH_FORMS_MENU } from './app-menus';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  mainMenu: AppMenu[];
  subMenu: AppMenu[];
  footerMenu: AppMenu[];
  authFormsMenu: AppMenu[];

  constructor() {
    this.mainMenu = MAIN_MENU;
    this.subMenu = SUB_MENU;
    this.footerMenu = FOOTER_MENU;
    this.authFormsMenu = AUTH_FORMS_MENU;
  }

  getMenu(menu: string): AppMenu[] {
    switch(menu) {
      case 'main':
        return this.mainMenu;
      case 'sub':
        return this.subMenu;
      case 'footer':
        return this.footerMenu;
      case 'auth-forms':
        return this.authFormsMenu;
      default:
        return null;
    }
  }

  stripMenuByNavTitles(navTitles: string[], menu: AppMenu[]) {
    let index: number;
    navTitles.forEach(navTitle => {
      index = menu.indexOf(menu.filter(item => item.navTitle === navTitle)[0]);
      menu.splice(index, 1);
    });
    return menu;
  }
}
