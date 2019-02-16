import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NotificationsResolver } from './notifications.resolver';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  providers: [NotificationsResolver]
})
export class NotificationsModule { }
