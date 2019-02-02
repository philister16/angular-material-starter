import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  redirectUrl: string;
  authState: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      console.log('authService#constructor:', user);
      if (user) this.isAuthenticated = true;
      else this.isAuthenticated = false;
    });
  }

  async signUp({ email, password }) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.router.navigateByUrl('/user');
    } catch(err) {
      console.log('authService#signUp:', err);
    }
  }

  async login({ email, password }) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      const url = this.redirectUrl || '/dashboard';
      this.router.navigateByUrl(url).finally(() => this.redirectUrl = null);
    } catch(err) {
      console.log('authService#login:', err);
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      this.router.navigateByUrl('/');
    } catch(err) {
      console.log('authService#logout:', err);
    }
  }

  async forgotPassword({ email }) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      return true;
    } catch(err) {
      console.log('authService#forgotPassword:', err);
    }
  }

  async resetPassword(code, password) {
    console.log('authService#resetPassword:', code, password);
    try {
      await this.afAuth.auth.verifyPasswordResetCode(code);
      await this.afAuth.auth.confirmPasswordReset(code, password);
    } catch(err) {
      console.log('authService#resetPassword:', err);
    }
  }

}
