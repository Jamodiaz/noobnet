import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Itechnicians } from '../users/technicians';
import { Observable } from 'rxjs';
import { Icategories } from './interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategoriesList (): Observable<Icategories> {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectAll");
  }

  getActiveCategories (): Observable<Icategories> {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectActive");
  }

  getInactiveCategories (): Observable<Icategories> {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectInactive");
  }

  updateCategory(category: Icategories):  Observable<Icategories>{

  return this.http.patch<Icategories>("http://localhost:44444/Categories/CategoriesUpdate", category);
  }

  updateCategoryActiveState(category: Icategories):  Observable<Icategories>{

    return this.http.patch<Icategories>("http://localhost:44444/Categories/CategoriesUpdateActiveState", category);
    }

  createCategory(category: Icategories) : Observable<Icategories> {

    return this.http.post<Icategories>("http://localhost:44444/Categories/CategoriesCreate", category);
  }

  categoryActiveCount() {
    return this.http.get("http://localhost:44444/Categories/CategoriesActiveCount");
  }

  categoryInactiveCount() {
    return this.http.get("http://localhost:44444/Categories/CategoriesInactiveCount");
  }

  getCategoriesSearch(keyword: string, pageNum: number, pageSize) {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectAllSearch/" + keyword +
     "/" + pageNum + "/" + pageSize).toPromise();
  }

  getCategoriesSearchCount(keyword: string) {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectAllSearchCount/" + keyword ).toPromise()
  }

  getCategoriesInactiveSearch(keyword: string, pageNum: number, pageSize) {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectAllInactiveSearch/" + keyword +
     "/" + pageNum + "/" + pageSize).toPromise();
  }

  getCategoriesInactiveSearchCount(keyword: string) {
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectAllInactiveSearchCount/" + keyword ).toPromise()
  }

}
