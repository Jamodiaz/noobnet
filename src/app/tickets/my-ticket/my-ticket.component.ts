import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createProviderInstance } from '@angular/core/src/view/provider';
import { DashboardService } from 'src/app/dashboard/ticket-dashboard/dashboard.service';
import { LogInComponent } from 'src/app/log-in/log-in.component';
import { Iusers } from 'src/app/users/users-and-technicians/users';
import { LogInService } from 'src/app/log-in/log-in.service';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { Itickets } from '../ticket';
import { UsersService } from 'src/app/users/users.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { TicketService } from '../ticket.service';
import { Itechnicians } from 'src/app/users/technicians';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { Iroles } from 'src/app/users/roles';
import { Istatus } from '../ticket-creation/status';
import { MatSelectChange } from '@angular/material';

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

  currentTicket: Itickets;

  isDirty: boolean = false;

  tickets: Itickets;
  technicians: Itechnicians;
  users:  Iusers;
  categories: Icategories;
  statusList: Istatus;

  authenticated: any;

  allTickets: any;
  universalCount: number;
  keywordForm: FormGroup;
  ticketForm: FormGroup

  cId: number;
  tId: number;
  sId: number;
  date: Date;

  constructor(private formBuilder: FormBuilder,
    private ticketBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private log: LogInService,
    private auth: AuthService, 
    private modalService: ModalService,
    private usersService: UsersService, 
    private categoriesService: CategoriesService, private ticketService: TicketService) { }

  ngOnInit() {
    this.formInit().then( res => {
      this.promiseForTable(this.pageNum);
      this.getCategories();
      this.getStatusList();
      this.getTechnicians();
      this.getUsers();
    }
    );
  }

  // Method to initialize form
  formInit(): Promise<void> {

    this.ticketForm = this.ticketBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      techComment: ['', Validators.required],
      techAssigned: ['', [Validators.required]],
      status: ['', Validators.required],
      category: ['', Validators.required],
      updatedBy: ['', Validators.required],
      updatedDate: ['', Validators.required],
      active: ['', Validators.required]
    });


    this.keywordForm = this.formBuilder.group({
      keyword: [""]
    });

    return Promise.resolve();
  }

  async promiseForTable(event: any) {
    this.pageNum = event;
    let tickets: any;
    let count: any;
    // let email = localStorage.getItem('AuthEmail');
    // let auth: any = await this.log.getAuthenticated(email);
    tickets = await this.dashboardService.getClientSearch(this.keyword, this.pageNum, this.pSize, this.auth.authenticated.User_id_pk);
    this.allTickets = tickets['Data'];
    count = await this.dashboardService.getClientSearchCount(this.keyword, this.auth.authenticated.User_id_pk);
    this.universalCount = count['Data'];
  }

  
  // This method saves the selected category id
  selectedCat(change: MatSelectChange): Promise<number> {
    this.cId = change.value;
    return Promise.resolve(this.cId)
  }

  // This method saves the selected technician id
  selectedTechnician(change: MatSelectChange): Promise<number> {
    this.tId = change.value;
    return Promise.resolve(this.tId)
  }
    
  selectedStatus(change: MatSelectChange): Promise<number> {
    this.sId = change.value;
    return Promise.resolve(this.tId)
  }

  dateChange(event: any): void {
    this.date = event.target.value
  }

  
  getStatusList() {
    this.ticketService.getStatus().subscribe((status: Istatus) => {
      this.statusList = status['Data']
   
    })
  }

   // Getter for the users
   getUsers() {
    this.usersService.getUsers().subscribe((users: Iusers) => {
      this.users = users['Data'];
    })
  }
  
   // Getter for the technicians
   getTechnicians() {
    this.usersService.getTechnicians().subscribe((technicians: Itechnicians) => {
      this.technicians = technicians['Data'];
    })
  }

    // This method gets all the categories 
    getCategories() {
      this.categoriesService.getCategoriesList().subscribe((categories: Icategories) => {
        this.categories = categories['Data'];
      })
    }


  // This method opens the modal for the create and edit category child component
  openModal(content, ticket): void {
    this.currentTicketPromise(ticket).then(res => {
      this.formSetData();
      this.isDirty = true;
      this.modalService.openModal(content);
    })
  }
  currentTicketPromise(ticket: Itickets): Promise<Itickets> {
    this.currentTicket = ticket;
    console.log(this.currentTicket)
    return Promise.resolve(this.currentTicket);
  }

  
  formSetData(): void {
    if (this.currentTicket != null) {
      this.ticketForm.controls['name'].setValue(this.currentTicket.name);
      this.ticketForm.controls['description'].setValue(this.currentTicket.description);
      this.ticketForm.controls['techComment'].setValue(this.currentTicket.tech_comments);
      this.ticketForm.controls['techAssigned'].setValue(this.currentTicket.tech_assigned_fk);
      this.ticketForm.controls['status'].setValue(this.currentTicket.status_fk);
      this.ticketForm.controls['category'].setValue(this.currentTicket.category_fk);
    }
  }

     // Handles cancel button in the form and popup for when the user hasn't save the form
     onCancelClick() {
      window.confirm("You have not saved this Ticket, are you sure you want to cancel?")
      this.modalService.closeModal();
    }
  
    updateTicket(form): void {
      this.promiseTicketUpdate(form).then(newTicket => {
        this.ticketService.updateTicket(newTicket).subscribe(result => {
          this.promiseForTable(this.pageNum);        
          this.modalService.closeModal();
        });
      });
    }
    promiseTicketUpdate(ticket): Promise<Itickets> {
      console.log(ticket)
      let newTicket: Itickets = {
      ticket_number_pk: this.currentTicket.ticket_number_pk,
        name: ticket.name,
        description: ticket.description,
        tech_comments: ticket.techComment,
        tech_assigned_fk: ticket.techAssigned,
        status_fk: ticket.status,
        category_fk: ticket.category,
        modified_by: this.auth.authenticated.User_id_pk,
        modified_date: this.date,
        active: true
      }
      console.log(newTicket)
      return Promise.resolve(newTicket);
    }


}
