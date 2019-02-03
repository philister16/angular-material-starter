import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// TODO: Remove Angularfire Fix
// Fix for console error, needed until issue #1993 on angularfire2 repo is solved
// https://github.com/angular/angularfire2/issues/1993
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { ErrorModule } from './error/error.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ErrorModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [
    // Fix for angularfire console error, see above
    { provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
