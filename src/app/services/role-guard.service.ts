import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('Role');

    if (!this.auth.isAuthenticated() || (role !== "Technician" )) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}


