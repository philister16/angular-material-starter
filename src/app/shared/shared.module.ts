import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [LoadingButtonComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    LoadingButtonComponent
  ]
})
export class SharedModule { }
