import { Injectable } from '@angular/core';

export interface AppMenuItem {
  navTitle: string,
  route: string,
  icon?: string
}

interface AppMenu {
  name: string,
  items: AppMenuItem[]
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  appMenus: AppMenu[];

  constructor() {
    this.appMenus = [
      { name: 'main', items: [
        { navTitle: 'Home', route: '/dashboard' },
        { navTitle: 'Login', route: '/auth/login' },
        { navTitle: 'Sign up', route: '/auth/signup' }
      ] },
      { name: 'sub', items: [
        { navTitle: 'Sub item 1', route: '/' },
        { navTitle: 'Sub item 1', route: '/' },
        { navTitle: 'Sub item 1', route: '/' }
      ] },
      { name: 'footer', items: [
        { navTitle: 'Home', route: '/dashboard' },
        { navTitle: 'Sign up', route: '/auth/signup' }
      ] },
      { name: 'footer-icons', items: [
        { navTitle: 'Help', route: '/help', icon: 'help' },
        { navTitle: 'Contact', route: '/contact', icon: 'email' }
      ] },
      { name: 'auth-forms', items: [
        { navTitle: "Login", route: '/auth/login' },
        { navTitle: 'Sign up', route: '/auth/signup' },
        { navTitle: 'Forgot password', route: '/auth/forgot-password' },
        { navTitle: 'Home', route: '/' }
      ] }
    ];
  }

  getMenu(name: string): AppMenuItem[] {
    return this.appMenus.filter(menu => menu.name === name)[0].items;
  }

  stripMenuByNavTitles(navTitles: string[], menu: AppMenuItem[]) {
    let index: number;
    navTitles.forEach(navTitle => {
      index = menu.indexOf(menu.filter(item => item.navTitle === navTitle)[0]);
      menu.splice(index, 1);
    });
    return menu;
  }
  
}
