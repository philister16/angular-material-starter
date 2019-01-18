import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isHandset$: Observable<Boolean>;
  mainMenu;
  subMenu;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService
    ) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
    this.mainMenu = this.menuService.getMenu('main');
    this.subMenu = this.menuService.getMenu('sub');
  }

  onMenuClick(drawer) {
    const isFullscreen = this.breakpointObserver.isMatched('(min-width: 600px)');
    if (!isFullscreen) {
      drawer.close();
    }
  }

}
