import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iusers } from './users-and-technicians/users';
import { Iroles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getTechnicians() {
    return this.http.get("http://localhost:44444/Users/UsersSelectByRole/1");
  }

  getUsers() {
    return this.http.get("http://localhost:44444/Users/UsersSelectByRole/2");
  }

  getAllUsers() {
    return this.http.get("http://localhost:44444/Users/UsersSelectAll");
  }

  getRoles() {
    return this.http.get("http://localhost:44444/Role/RoleSelectAll");
  }

  createUser(user: Iusers) : Observable<Iusers> {
    return this.http.post<Iusers>("http://localhost:44444/Users/UsersCreate", user);
  }

  editUser(user: Iusers) : Observable<Iusers> {
    return this.http.patch<Iusers>("http://localhost:44444/Users/UsersUpdate", user);
  }

  createRole(role: Iroles) : Observable<Iroles> {
    return this.http.post<Iroles>("http://localhost:44444/Role/RoleCreate", role);
  }

  updateRole(role: Iroles) : Observable<Iroles> {
    return this.http.patch<Iroles>("http://localhost:44444/Role/RoleUpdate", role);
  }


  updateRoleActiveState(role: Iroles):  Observable<Iroles>{
  return this.http.patch<Iroles>("http://localhost:44444/Role/RoleUpdateActiveState", role);
    }


}
