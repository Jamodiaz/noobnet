import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { createProviderInstance } from '@angular/core/src/view/provider';
import { DashboardService } from 'src/app/dashboard/ticket-dashboard/dashboard.service';
import { LogInComponent } from 'src/app/log-in/log-in.component';
import { Iusers } from 'src/app/users/users-and-technicians/users';
import { LogInService } from 'src/app/log-in/log-in.service';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.css']
})
export class MyTicketComponent implements OnInit {

  ticketsCols: string[] = ["ticket_number_pk", "name", "firstname",
    "lastname", "category_type", "status", "created_date", "actions"];

  pSize: number = 7;
  pageNum: number = 1;
  keyword: string = "Open";

  authenticated: any;

  allTickets: any;
  universalCount: number;
  keywordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private log: LogInService) { }

  ngOnInit() {
    this.formInit().then( res => {
      this.promiseForTable(this.pageNum);
    }
    );
  }

  // Method to initialize form
  formInit(): Promise<void> {

    this.keywordForm = this.formBuilder.group({
      keyword: [""]
    });

    return Promise.resolve();
  }

  async promiseForTable(event: any) {
    this.pageNum = event;
    let tickets: any;
    let count: any;
    let email = localStorage.getItem('AuthEmail');
    let auth: any = await this.log.getAuthenticated(email);
    this.authenticated = await auth.Data.User_id_pk;
    tickets = await this.dashboardService.getClientSearch(this.keyword, this.pageNum, this.pSize, this.authenticated);
    this.allTickets = tickets['Data'];
    count = await this.dashboardService.getClientSearchCount(this.keyword, this.authenticated);
    this.universalCount = count['Data'];
  }


}
