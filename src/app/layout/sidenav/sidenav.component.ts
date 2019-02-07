import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from 'src/app/menu/menu.service';
import { AlertService } from 'src/app/core/alert.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

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
  loadingSubscription: Subscription;
  isLoading: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
    this.mainMenu = this.menuService.getMenu('main');
    this.subMenu = this.menuService.getMenu('sub');
    this.alertSubscription = this.alertService.hasAlert$.subscribe(state => this.hasAlert = state);
    this.loadingSubscription = this.router.events.subscribe((e: RouterEvent) => {
      switch(true) {
        case e instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case e instanceof NavigationEnd:
        case e instanceof NavigationCancel:
        case e instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  onMenuClick(drawer) {
    const isFullscreen = this.breakpointObserver.isMatched('(min-width: 600px)');
    if (!isFullscreen) {
      drawer.close();
    }
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
