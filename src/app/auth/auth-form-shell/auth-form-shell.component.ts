import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService, AppMenuItem } from 'src/app/core/menu.service';

@Component({
  selector: 'app-auth-form-shell',
  templateUrl: './auth-form-shell.component.html',
  styleUrls: ['./auth-form-shell.component.scss']
})
export class AuthFormShellComponent implements OnInit {
  @Input() heading: string;
  menu: AppMenuItem[];
  mode: string;

  constructor(private menuService: MenuService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.getMode(this.router.url);
    this.menu = this.changeMenu(this.mode, this.menuService.getMenu('auth-forms').slice())
  }

  getMode(url) {
    const mode = url.split('/');
    return mode[mode.length - 1];
  }

  changeMenu(mode, menu) {
    switch(mode) {
      case 'login':
        return this.menuService.stripMenuByNavTitles(['Login'], menu);
      case 'signup':
        return this.menuService.stripMenuByNavTitles(['Sign up'], menu);
      default:
        return this.menuService.stripMenuByNavTitles(['Forgot password'], menu);
    }
  }

}
