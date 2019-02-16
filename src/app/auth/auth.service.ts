import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AlertService } from '../core/alert.service';

const snackbarConfig: MatSnackBarConfig = {
  duration: 5000,
  horizontalPosition: 'end',
  verticalPosition: 'top'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private snackbar: MatSnackBar,
    private db: AngularFirestore,
    private alertService: AlertService) {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user && !user.emailVerified) {
          this.hasEmailAlert(true);
        }
      });
  }

  get userId() {
    return this.afAuth.auth.currentUser.uid;
  }

  async resendEmailVerificationLink() {
    try {
      await this.afAuth.auth.currentUser.sendEmailVerification();
      this.snackbar.open('Email verification link sent to your inbox', 'OK', snackbarConfig);
    } catch(err) {
      console.log('AuthService#resendEmailVerificationLink:', err);
    }
  }

  async verifyEmail(actionCode: string) {
    try {
      await this.afAuth.auth.applyActionCode(actionCode);
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
        username,
        email
      });
      await cred.user.sendEmailVerification();
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
      this.snackbar.open('Reset link sent. Check your inbox.', 'OK', snackbarConfig);
    } catch(err) {
      throw err;
    }
  }

  async resetPassword(code, password) {
    try {
      await this.afAuth.auth.verifyPasswordResetCode(code);
      await this.afAuth.auth.confirmPasswordReset(code, password);
      this.snackbar.open('Password changed', 'OK', snackbarConfig);
    } catch(err) {
      throw err;
    }
  }

  async updatePassword(oldPassword, newPassword) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(this.afAuth.auth.currentUser.email, oldPassword);
      await this.afAuth.auth.currentUser.updatePassword(newPassword);
      this.snackbar.open('Password changed successfully', 'OK', snackbarConfig);
    } catch(err) {
      throw err;
    }
  }

  async updateEmail(password, newEmail) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(this.afAuth.auth.currentUser.email, password);
      await this.afAuth.auth.currentUser.updateEmail(newEmail);
      this.snackbar.open('Email address changed', 'OK', snackbarConfig);
      await this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
        email: newEmail
      });
      await this.afAuth.auth.currentUser.sendEmailVerification();
      this.hasEmailAlert(true);
    } catch(err) {
      throw err;
    }
  }

  async recoverEmail(actionCode) {
    try {
      const info = await this.afAuth.auth.checkActionCode(actionCode);
      console.log(info.data.email);
      await this.afAuth.auth.applyActionCode(actionCode);
      await this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
        email: info.data.email
      });
      this.hasEmailAlert(false);
    } catch(err) {
      throw err;
    }
  }

}
