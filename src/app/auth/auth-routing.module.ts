import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';

const authRoutes: Routes = [
    { path: 'auth', children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'signup', component: SignupComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'reset-password', component: ResetPasswordComponent }
    ]},
    { path: 'user', component: SidenavComponent, children: [
        { path: '', pathMatch: 'full', component: UserComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }