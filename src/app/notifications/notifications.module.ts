import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NotificationsResolver } from './notifications.resolver';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  providers: [NotificationsResolver]
})
export class NotificationsModule { }
