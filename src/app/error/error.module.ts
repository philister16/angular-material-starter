import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule
  ]
})
export class ErrorModule { }
