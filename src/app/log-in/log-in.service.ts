import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter, retry, catchError } from 'rxjs/operators';
import { Iusers } from '../users/users-and-technicians/users';
import { Iroles } from '../users/roles';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  login(user: Iusers) {
    return this.http.post<any>('http://localhost:44444/api/login', user ).pipe(map(res => {
    localStorage.setItem('Access_token', res.Data.Access_token);
    })).toPromise();
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('Access_token') !== null;
  }

  logout() {
    localStorage.removeItem('Access_token');
    localStorage.removeItem('AuthEmail');
    localStorage.removeItem('AuthId');
    localStorage.removeItem('Role');
  }

  getRoleOfAuthenticated(email: string) {
    return this.http.get<any>("http://localhost:44444/Users/getUserRole/" + email + "/").pipe(map((res: any ) => {
    localStorage.setItem('Role', res.Data.Role_type);
    })).toPromise();
  }

  getAuthenticated(email: string) {
    return this.http.get<any>("http://localhost:44444/Users/getUser/" + email + "/").toPromise();
  }

}
