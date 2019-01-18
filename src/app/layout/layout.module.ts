import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TopbarComponent, SidenavComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class LayoutModule { }
