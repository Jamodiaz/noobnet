import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategories } from '../categories/interfaces/categories';
import { Iusers } from '../users/users-and-technicians/users';

@Injectable({
  providedIn: 'root'
})
export class SelectByIdService {

  constructor(private http:HttpClient) { }

  getCategoryById (id: number): Observable<Icategories> {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectById/" +  id);
  }

  getUserById (id: number): Observable<Iusers> {
    return this.http.get("http://localhost:44444/Users/UsersSelectById/" +  id);

  }

}
