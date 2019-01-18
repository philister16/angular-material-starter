import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
