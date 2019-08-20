import { Component, OnInit } from '@angular/core';
import { MyHomeService } from './my-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roleCount: number;
  ticketCount: number;
  catCount: number;
  techCount: number;
  clientCount: number;
  role : any = localStorage.getItem('Role');

  constructor(private homeService: MyHomeService) { }

  ngOnInit() {
    this.getTechCount();
    this.getClientCount();
    this.getCategoriesCount();
    this.getTicketCount();
    this.getRoleCount();
  }

  // Getter for the technician count 
  getTechCount() {
    this.homeService.getTechniciansCount().subscribe(res => {
      this.techCount = res['Data'];
    });
  }

  // Getter for the client count
  getClientCount() {
    this.homeService.getClientCount().subscribe(res => {
      this.clientCount = res['Data'];
    });
  }

  // Getter for the categories count 
  getCategoriesCount() {
    this.homeService.getCategoriesCount().subscribe(res => {
      this.catCount = res['Data'];
    });
  }

  // Getter for the roles count
  getRoleCount() {
    this.homeService.getRoleCount().subscribe(res => {
      this.roleCount = res['Data'];
    });
  }

  // Getter for the ticket count
  getTicketCount() {
    this.homeService.getTicketCount().subscribe(res => {
      this.ticketCount = res['Data'];
    });
  }

}
