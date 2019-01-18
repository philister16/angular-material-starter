/**
 * Definition of all menus across the app
 */

export interface AppMenu {
  navTitle: string,
  route: string
}

export const MAIN_MENU: AppMenu[] = [
    { navTitle: 'test', route: '/full-page' },
    { navTitle: 'Item 2', route: '/full-page' },
    { navTitle: 'Item 3', route: '/full-page' }
  ];

export const SUB_MENU: AppMenu[] = [
  { navTitle: 'Sub item 1', route: '/full-page' },
  { navTitle: 'Sub item 1', route: '/full-page' },
  { navTitle: 'Sub item 1', route: '/full-page' }
]

export const FOOTER_MENU: AppMenu[] = [
  { navTitle: 'Foot item 1', route: '/full-page' },
  { navTitle: 'Foot item 2', route: '/full-page' }
]