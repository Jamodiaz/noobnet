import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTicketCreatedDatesMonthNumber(year: number) {
    return this.http.get("http://localhost:44444/Ticket/SelectTicketCreatedDateMonth/" + year).toPromise();
  }

  getTicketCreatedDatesCountPerMonth(year: number) {
    return this.http.get("http://localhost:44444/Ticket/SelectTicketCreatedDateMonthCount/" + year).toPromise();
  }

  getTicketCreatedYears() {
    return this.http.get("http://localhost:44444/Ticket/SelectTicketCreatedYears").toPromise();
  }

  getCurrentYear() {
    return this.http.get("http://localhost:44444/Ticket/SelectCurrentYear").toPromise();
  }

  getUniversalSearch(keyword: string, pageNum: number, pageSize) {
    return this.http.get("http://localhost:44444/Ticket/UniversalTicketSearch/" + keyword + "/" + pageNum + "/" + pageSize).toPromise();
  }

  getUniversalSearchCount(keyword: string) {
    return this.http.get("http://localhost:44444/Ticket/UniversalTicketSearchCount/" + keyword).toPromise();
  }

  getTechnicianSearch(keyword: string, pageNum: number, pageSize, id: number) {
    return this.http.get("http://localhost:44444/Ticket/TechnicianTicketSearch/" + keyword + "/" + pageNum + "/" + pageSize + "/" + id).toPromise();
  }

  getTechnicianSearchCount(keyword: string, id: number) {
    return this.http.get("http://localhost:44444/Ticket/TechnicianTicketSearchCount/" + keyword + "/" + id).toPromise();
  }

  getClientSearch(keyword: string, pageNum: number, pageSize, id: number) {
    return this.http.get("http://localhost:44444/Ticket/ClientTicketSearch/" + keyword + "/" + pageNum + "/" + pageSize + "/" + id).toPromise();
  }

  getClientSearchCount(keyword: string, id: number) {
    return this.http.get("http://localhost:44444/Ticket/ClientTicketSearchCount/" + keyword + "/" + id).toPromise();
  }

  getCategorySearch(keyword: string, pageNum: number, pageSize, id: number) {
    return this.http.get("http://localhost:44444/Ticket/CategoryTicketSearch/" + keyword + "/" + pageNum + "/" + pageSize + "/" + id).toPromise();
  }

  getCategorySearchCount(keyword: string, id: number) {
    return this.http.get("http://localhost:44444/Ticket/CategoryTicketSearchCount/" + keyword + "/" + id).toPromise();
  }

  getStatusSearch(keyword: string, pageNum: number, pageSize, id: number) {
    return this.http.get("http://localhost:44444/Ticket/StatusTicketSearch/" + keyword + "/" + pageNum + "/" + pageSize + "/" + id).toPromise();
  }

  getStatusSearchCount(keyword: string, id: number) {
    return this.http.get("http://localhost:44444/Ticket/StatusTicketSearchCount/" + keyword + "/" + id).toPromise();
  }

}
