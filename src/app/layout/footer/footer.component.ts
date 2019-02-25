import { Component, OnInit } from '@angular/core';
import { MenuService, AppMenuItem } from 'src/app/core/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  footerMenu: AppMenuItem[];
  footerIconMenu: AppMenuItem[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.footerMenu = this.menuService.getMenu('footer');
    this.footerIconMenu = this.menuService.getMenu('footer-icons');
  }

}
