import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyHomeService {

  constructor(private http:HttpClient) { }

  getTechniciansCount() {
    return this.http.get("http://localhost:44444/Users/TechnicianCount");
  }

  getClientCount() {
    return this.http.get("http://localhost:44444/Users/ClientCount");
  }

  getRoleCount() {
    return this.http.get("http://localhost:44444/Role/RoleCount");
  }

  getTicketCount() {
    return this.http.get("http://localhost:44444/Ticket/TicketCount");
  }

  getCategoriesCount() {
    return this.http.get("http://localhost:44444/Categories/CategoriesCount");
  }

}
