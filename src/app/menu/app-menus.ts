/**
 * Definition of all menus across the app
 */

export interface AppMenu {
  navTitle: string,
  route: string
}

export const MAIN_MENU: AppMenu[] = [
    { navTitle: 'Home', route: '/dashboard' },
    { navTitle: 'Login', route: '/auth/login' },
    { navTitle: 'Sign up', route: '/auth/signup' }
  ];

export const SUB_MENU: AppMenu[] = [
  { navTitle: 'Sub item 1', route: '/' },
  { navTitle: 'Sub item 1', route: '/' },
  { navTitle: 'Sub item 1', route: '/' }
]

export const FOOTER_MENU: AppMenu[] = [
  { navTitle: 'Home', route: '/dashboard' },
  { navTitle: 'Sign up', route: '/auth/signup' }
]

export const AUTH_FORMS_MENU: AppMenu[] = [
  { navTitle: "Login", route: '/auth/login' },
  { navTitle: 'Sign up', route: '/auth/signup' },
  { navTitle: 'Forgot password', route: '/auth/forgot-password' },
  { navTitle: 'Home', route: '/' }
]