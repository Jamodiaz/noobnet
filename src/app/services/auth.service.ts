import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Iusers } from '../users/users-and-technicians/users';
import { LogInService } from '../log-in/log-in.service';
import { Iauth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authenticated: Iauth;

  constructor(public jwtHelper: JwtHelperService, private log: LogInService) { }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('Access_token');
    let role = localStorage.getItem('Role');
    let email = localStorage.getItem('AuthEmail');

    this.authenticatedUser(email);

    return !this.jwtHelper.isTokenExpired(token);
  }

  async authenticatedUser(email) {
    let authenticated: any = await this.log.getAuthenticated(email);
    this.authenticated = authenticated.Data;
  }

}
