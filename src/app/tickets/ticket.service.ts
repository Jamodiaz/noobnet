import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itickets } from './ticket';
import { Istatus } from './ticket-creation/status';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getStatus(): Observable<Istatus> {
    return this.http.get("http://localhost:44444/Ticket_Status/StatusSelectAll");
  }

  getTickets(): Observable<Itickets> {
    return this.http.get("http://localhost:44444/Ticket/TicketSelectAll");
  }

  getOpenedTickets(): Observable<Itickets> {
    return this.http.get("http://localhost:44444/Ticket/TicketSelectOpen");
  }

  getTClosedTickets(): Observable<Itickets> {
    return this.http.get("http://localhost:44444/Ticket/TicketSelectClosed");
  }

  getMyTicket(id: number): Observable<Itickets> {
    return this.http.get("http://localhost:44444/Ticket/MyTicketSelect/" + id);
  }

  createTicket(ticket: Itickets): Observable<Itickets> {
    return this.http.post<Itickets>("http://localhost:44444/Ticket/TicketCreate", ticket);
  }

  updateTicket(ticket: Itickets) {
    return this.http.patch("http://localhost:44444/Ticket/TicketUpdate", ticket);
  }

  addTechnicianComments(ticket: Itickets): Observable<Itickets> {
    return this.http.put<Itickets>("http://localhost:44444/Ticket/TicketAddTechnicianComments", ticket);
  }

  updateTicketActiveState(ticket: Itickets): Observable<Itickets> {
    return this.http.patch<Itickets>("http://localhost:44444/Ticket/TicketUpdateActiveState", ticket);
  }

  getOpenedTicketsCount()  {
    return this.http.get("http://localhost:44444/Ticket/SelectOpenedTicketCount");
  }

  getClosedTicketsCount()  {
    return this.http.get("http://localhost:44444/Ticket/SelectClosedTicketCount");
  }

  getCategoryMostTickets() {
    return this.http.get("http://localhost:44444/Ticket/SelectCategoryMostTickets");
  }

  getCountCategoryMostTickets() {
    return this.http.get("http://localhost:44444/Ticket/SelectCategoryMostTicketsCount");
  }

  getMaxOpenedTicketCount() {
    return this.http.get("http://localhost:44444/Ticket/SelectMaxOpenedTicketCount");
  }

  getMaxClosedTicketCount(){
    return this.http.get("http://localhost:44444/Ticket/SelectMaxClosedTicketCount");
  }

  getTechnicianMaxOpenedTickets() {
    return this.http.get("http://localhost:44444/Ticket/SelectTechnicianMaxOpenedTickets");
  }

  getTechnicianMaxClosedTickets() {
    return this.http.get("http://localhost:44444/Ticket/SelectTechnicianMaxClosedTickets");
  }

  getOpenStatusId() {
    return this.http.get("http://localhost:44444/Ticket_Status/SelectOpenStatusId").toPromise();
  }


}
