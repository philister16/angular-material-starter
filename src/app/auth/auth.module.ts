import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthFormShellComponent } from './auth-form-shell/auth-form-shell.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ChangeEmailComponent } from './user/change-email/change-email.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { ActionComponent } from './action/action.component';
import { UserResolver } from './user/user.resolver';

@NgModule({
  declarations: [SignupComponent, LoginComponent, ForgotPasswordComponent, AuthFormShellComponent, ResetPasswordComponent, UserComponent, UpdateProfileComponent, ChangePasswordComponent, ChangeEmailComponent, LogoutComponent, ActionComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [UserResolver]
})
export class AuthModule { }
