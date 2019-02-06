import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from 'src/app/menu/menu.service';
import { AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<Boolean>;
  mainMenu;
  subMenu;
  alertSubscription: Subscription;
  hasAlert: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
    this.mainMenu = this.menuService.getMenu('main');
    this.subMenu = this.menuService.getMenu('sub');
    this.alertSubscription = this.alertService.hasAlert$.subscribe(state => this.hasAlert = state);
  }

  onMenuClick(drawer) {
    const isFullscreen = this.breakpointObserver.isMatched('(min-width: 600px)');
    if (!isFullscreen) {
      drawer.close();
    }
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

}
