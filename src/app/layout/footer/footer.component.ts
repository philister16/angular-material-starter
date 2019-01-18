import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/menu/menu.service';
import { AppMenu } from 'src/app/menu/app-menus';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  footerMenu: AppMenu[]

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.footerMenu = this.menuService.getMenu('footer');
  }

}
