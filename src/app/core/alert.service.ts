import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: string,
  message: string,
  dismiss: string,
  goToRoute?: string,
  action?: Function
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];
  hasAlert$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.initAlerts();
  }

  /**
   * Issues a new alert
   * @param alert The object with the alert's message, type and dismiss button text. Optionally
   */
  issue(alert: Alert) {
    this.alerts.push(alert);
    this.hasAlert$.next(true);
  }

  /**
   * Dismisses and alert. The method also executed any associated actions and navigates to the goToRoute if specified. If you mean to only close the alert without any actions or routing use the alternative .remove() method.
   * @param alert The alert to dismiss
   */
  dismiss(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    if (alert.action) {
      alert.action();
    }
    if (alert.goToRoute) {
      this.router.navigateByUrl(alert.goToRoute);
    }
    if (this.alerts.length > 0) {
      this.hasAlert$.next(true);
    } else {
      this.hasAlert$.next(false);
    }
  }

  /**
   * Removes and closes an alert. This method does NOT execute any associated actions or routing. If you need actions/routing to execute use the alternative method .dismiss().
   * @param alert Alert which to remove.
   */
  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  private initAlerts() {
    if (this.alerts.length > 0) {
      this.hasAlert$.next(true);
    }
  }

}
