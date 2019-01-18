import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, 
  MatButtonModule, 
  MatIconModule, 
  MatListModule,
  MatBadgeModule,
  MatSidenavModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
