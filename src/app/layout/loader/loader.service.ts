import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { 
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
 } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  dataLoader = new Subject<boolean>();
  routeLoader = new Subject<boolean>();

  constructor(private router: Router) {
    this.subscribeToRouterEvents();
  }

  /**
   * Starts the loading spinner
   */
  start() {
    this.dataLoader.next(true);
  }

  /**
   * Stops the loading spinner
   */
  stop() {
    this.dataLoader.next(false);
  }

  private subscribeToRouterEvents() {
    this.router.events.subscribe((e: RouterEvent) => {
      switch(true) {
        case e instanceof NavigationStart: {
          this.routeLoader.next(true);
          break;
        }
        case e instanceof NavigationEnd:
        case e instanceof NavigationCancel:
        case e instanceof NavigationError: {
          this.routeLoader.next(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

}
