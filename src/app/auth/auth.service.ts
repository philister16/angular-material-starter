import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  user: Observable<firebase.User>;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private snackbar: MatSnackBar,
    private db: AngularFirestore) {
      this.user = this.afAuth.user;
      this.afAuth.user.subscribe(user => {
        console.log('AuthService#constructor:', user);
      });
    }

  async signUp({ email, password, username }) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.db.collection('users').doc(cred.user.uid).set({
        username
      });
      const url = this.redirectUrl || '/user';
      this.router.navigateByUrl(url);
    } catch(err) {
      console.log('authService#signUp:', err);
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
