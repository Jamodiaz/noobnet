import { Component, OnInit } from '@angular/core';
import { MyHomeService } from './my-home.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  getTechCount() {
    this.homeService.getTechniciansCount().subscribe(res => {
      this.techCount = res['Data'];
    });
  }

  getClientCount() {
    this.homeService.getClientCount().subscribe(res => {
      this.clientCount = res['Data'];
    });
  }

  getCategoriesCount() {
    this.homeService.getCategoriesCount().subscribe(res => {
      this.catCount = res['Data'];
    });
  }

  getRoleCount() {
    this.homeService.getRoleCount().subscribe(res => {
      this.roleCount = res['Data'];
    });
  }

  getTicketCount() {
    this.homeService.getTicketCount().subscribe(res => {
      this.ticketCount = res['Data'];
    });
  }

}
