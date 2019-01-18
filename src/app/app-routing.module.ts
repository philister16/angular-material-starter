import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: SidenavComponent, children: [
    { path: 'dashboard', component: DashboardComponent}
  ]},
  { path: '**', redirectTo: '404' },
  { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
