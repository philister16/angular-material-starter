import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { ActionComponent } from './action/action.component';
import { UserResolver } from './user/user.resolver';

const authRoutes: Routes = [
    { path: 'auth', children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'signup', component: SignupComponent },
        { path: 'login', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'action', component: ActionComponent }
    ]},
    { path: 'user', component: SidenavComponent, canActivate: [AuthGuard], children: [
        { path: '', pathMatch: 'full', component: UserComponent, resolve: { userInfo: UserResolver } }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }