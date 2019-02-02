import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  redirectUrl: string;
  authState: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private snackbar: MatSnackBar) {
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
      const url = this.redirectUrl || '/user';
      this.router.navigateByUrl(url);
    } catch(err) {
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      const url = this.redirectUrl || '/dashboard';
      this.router.navigateByUrl(url).finally(() => this.redirectUrl = null);
    } catch(err) {
      throw err;
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      this.router.navigateByUrl('/');
    } catch(err) {
      throw err;
    }
  }

  async forgotPassword({ email }) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      this.snackbar.open('Reset link sent. Check your inbox.', 'OK', { duration: 3000 });
    } catch(err) {
      throw err;
    }
  }

  async resetPassword(code, password) {
    try {
      await this.afAuth.auth.verifyPasswordResetCode(code);
      await this.afAuth.auth.confirmPasswordReset(code, password);
      this.snackbar.open('Password changed', 'OK', { duration: 5000 });
      this.router.navigateByUrl('/auth/login');
    } catch(err) {
      throw err;
    }
  }

}
