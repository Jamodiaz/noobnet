import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { ITechniciansAssigned } from '../../categoriesTechnicianAssigned';


@Injectable({
  providedIn: 'root'
})

export class TechnicianAssigmentsService {

  constructor(private http:HttpClient) { }

  getTechnicianAssignedCategories(id: number): Observable<ITechniciansAssigned>{
    return this.http.get("http://localhost:44444/Categories/CategoriesSelectByTechnicianAssigned/" + id);
  }

  getTechnicianNotAssignedCategories(id: number): Observable<ITechniciansAssigned>{
    return this.http.get("http://localhost:44444/Categories/CategoriesTechnicianSelectByNotAssigned/" + id);
  }

  createTechnicianAssigned(assigned: ITechniciansAssigned) : Observable<ITechniciansAssigned> {
    return this.http.post<ITechniciansAssigned>("http://localhost:44444/Categories/CategoriesCreateTechnicianAssigned", assigned);
  }

  removeTechnicianAssigned(techId: number, catId: number) : Observable<ITechniciansAssigned> {
    return this.http.delete<ITechniciansAssigned>("http://localhost:44444/Categories/CategoriesTechnicianAssignedRemove/" + techId + "/" + catId);
  }


}
