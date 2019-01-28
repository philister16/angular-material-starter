import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  redirectUrl: string;

  constructor(private router: Router) {
    
  }

  login() {
    this.isAuthenticated = true;
    const url = this.redirectUrl || '/dashboard';
    this.router.navigateByUrl(url);
  }

  logout() {
    this.isAuthenticated = false;
  }

}
