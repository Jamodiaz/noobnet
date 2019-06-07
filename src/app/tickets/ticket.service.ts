import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itickets } from './ticket';
import { Istatus } from './ticket-creation/status';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }


  getStatus() : Observable<Istatus> {
    return this.http.get("http://localhost:44444/Ticket_Status/StatusSelectAll");
  }




}
