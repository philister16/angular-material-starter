import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AlertService } from '../core/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  currentUser: firebase.User;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private snackbar: MatSnackBar,
    private db: AngularFirestore,
    private alertService: AlertService) {
      this.afAuth.auth.onAuthStateChanged(user => {
        console.log('AuthService#constructor:', user);
        this.currentUser = user;
        if (user && !user.emailVerified) {
          this.hasEmailAlert(true);
        }
      });
  }

  async resendEmailVerificationLink() {
    try {
      await this.afAuth.auth.currentUser.sendEmailVerification();
      this.alertService.issue({
        type: 'info',
        message: 'Link delivered to your inbox again. Please click it to verify your email.',
        dismiss: 'OK'
      });
    } catch(err) {
      console.log('AuthService#resendEmailVerificationLink:', err);
    }
  }

  async verifyEmail(actionCode: string) {
    try {
      await this.afAuth.auth.applyActionCode(actionCode);
      await this.currentUser.reload()
      this.hasEmailAlert(false);
    } catch(err) {
      throw err;
    }
  }

  private hasEmailAlert(showAlert: boolean) {
    const alert = {
      type: 'warning',
      message: 'Please verify your email address. Check your inbox and click the link.',
      dismiss: 'Resend link',
      action: () => { return this.resendEmailVerificationLink() }
    }
    if (showAlert) {
      this.alertService.issue(alert);
    } else {
      this.alertService.remove(alert);
    }

  }

  async signUp({ email, password, username }) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.db.collection('users').doc(cred.user.uid).set({
        username
      });
      await cred.user.sendEmailVerification();
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
