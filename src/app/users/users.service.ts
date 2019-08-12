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

  getTechnicians() : Observable<Iusers>  {
    return this.http.get("http://localhost:44444/Users/UsersSelectByRole/1");
  }

  getUsers() : Observable<Iusers>  {
    return this.http.get("http://localhost:44444/Users/UsersSelectByRole/2");
  }

  getAllUsers() : Observable<Iusers> {
    return this.http.get("http://localhost:44444/Users/UsersSelectAll");
  }

  getTechniciansByCategoryAssigned(id: number) : Observable<Iusers> {
    return this.http.get("http://localhost:44444/Users/TechnicianSelectByCategoryAssigned/" + id);
  }

  getRoles() : Observable<Iroles>  {
    return this.http.get("http://localhost:44444/Role/RoleSelectAll");
  }

  getActiveRoles() : Observable<Iroles> {
    return this.http.get("http://localhost:44444/Role/RoleUpdateActiveState");
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

  getAllRolesPagination(pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Role/RolesSelectAllPagination/" 
    + pageNum + "/" + pageSize).toPromise();
  }

  getAllActiveRolesSearch (keyword: string, pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Role/RolesSelectAllActiveSearch/" 
    + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getAllInactiveRolesSearch (keyword: string, pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Role/RolesSelectAllInactiveSearch/" 
    + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getAllActiveRolesSearchCount (keyword: string) {
    return this.http.get("http://localhost:44444/Role/RolesSelectAllActiveSearchCount/" 
    + keyword).toPromise();
  }

  getAllInactiveRolesSearchCount (keyword: string) {
    return this.http.get("http://localhost:44444/Role/RolesSelectAllInactiveSearchCount/" 
    + keyword).toPromise();
  }

  getAllTechSearch(keyword: string, pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Users/TechniciansSelectAllSearch/" 
    + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getAllUsersSearch(keyword: string, pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Users/UsersSelectAllSearch/" 
    + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getAllTechSearchCount (keyword: string) {
    return this.http.get("http://localhost:44444/Users/TechniciansSelectAllSearchCount/" 
    + keyword).toPromise();
  }

  getAllUsersSearchCount (keyword: string) {
    return this.http.get("http://localhost:44444/Users/UsersSelectAllSearchCount/" 
    + keyword).toPromise();
  }

  getAllSearch(keyword: string, pageNum: number, pageSize: number) {
    return this.http.get("http://localhost:44444/Users/UsersAndTechniciansSelectAllSearch/" 
    + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getAllSearchCount(keyword: string) {
    return this.http.get("http://localhost:44444/Users/UsersAndTechniciansSelectAllSearchCount/" 
    + keyword).toPromise();
  }

}
