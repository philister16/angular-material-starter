import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { NotificationsResolver } from './notifications/notifications.resolver';

const routes: Routes = [
  { path: '', component: SidenavComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'notifications', component: NotificationsComponent, resolve: { notifications: NotificationsResolver } }
  ]},
  { path: '**', redirectTo: '404' },
  { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
