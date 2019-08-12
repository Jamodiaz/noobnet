import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getTechAssignments(pageNum: number, pageSize: number, id: number) {
    return this.http.get("http://localhost:44444/Users/TechnicianAssignmentSelectById/" + pageNum + "/" +
    pageSize + "/" + id).toPromise();
  }

  getTechAssignmentsCount(id: number) {
    return this.http.get("http://localhost:44444/Users/TechnicianAssignmentSelectByIdCount/" + id).toPromise();
  }

}
