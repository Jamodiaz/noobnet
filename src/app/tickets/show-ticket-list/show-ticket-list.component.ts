import { Component, OnInit } from '@angular/core';
import { Itickets } from '../ticket';
import { TicketService } from '../ticket.service';
import { ModalService } from 'src/app/services/modal.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { Iusers } from 'src/app/users/users-and-technicians/users';
import { Itechnicians } from 'src/app/users/technicians';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { Istatus } from '../ticket-creation/status';
import { MatSelectChange, Sort } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/dashboard/ticket-dashboard/dashboard.service';
import { MyHomeService } from 'src/app/home/home/my-home.service';
import { Inav } from 'src/app/common/navigate/navigate';


@Component({
  selector: 'app-show-ticket-list',
  templateUrl: './show-ticket-list.component.html',
  styleUrls: ['./show-ticket-list.component.css']
})
export class ShowTicketListComponent implements OnInit {

  pSize: number = 7;
  pageNum: number = 1;
  keyword: string = "Open";

  allTickets: any;
  universalCount: number;

  openedTicketsCount: number;
  closedTicketsCount: number;
  ticketCount: number;

  keywordForm: FormGroup;

  ticketList: Itickets;
  openedTickets: Itickets;
  closedTickets: Itickets;
  currentTicket: Itickets;
  users: Iusers;
  technicians: Itechnicians;
  categories: Icategories;
  statusList: Istatus;

  ticketForm: FormGroup;
  commentForm: FormGroup;

  isDirty: boolean;

  date: Date;
  cId: number;
  tId: number;
  sId: number;

  ticketsCols: string[] = ["ticket_number_pk", "name", "firstname",
    "lastname", "category_type", "status", "created_date", 'actions'];

  nav: Inav[] = [
    {
      title: "Home",
      route: "/home"
    },
    {
      title: "Dashboard",
      route: "/dashboard"
    },
    {
      title: "Ticket Creation",
      route: "/ticketcreation"
    }
  ];

  constructor(private ticketService: TicketService,
    private modalService: ModalService,
    private ticketBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private auth: AuthService,
    private dashboardService: DashboardService,
    private homeService: MyHomeService) { }

  ngOnInit() {
    this.getTicketCount();
    this.getOpenedTicketCount();
    this.getClosedTicketsCount();
    this.promiseForTable(this.pageNum);
    this.formInit().then(res => {
      this.getTickets();
      this.getOpenTickets();
      this.getClosedTickets();
      this.getCategories();
      this.getUsers();
      this.getTechnicians();
      this.getStatusList();
    });
  }

  // This method handles the search bar for the table
  onSearchChange(event: string) {
    this.keyword = event;
    this.promiseForTable(this.pageNum);
  }

  // This method gets all the data to display in the table
  async promiseForTable(event: any) {
    this.pageNum = event;
    let tickets: any;
    let count: any;
    tickets = await this.dashboardService.getUniversalSearch(this.keyword, this.pageNum, this.pSize);
    this.allTickets = tickets['Data'];
    count = await this.dashboardService.getUniversalSearchCount(this.keyword);
    this.universalCount = count['Data'];
  }

  // This method gets all the tickets count
  getTicketCount() {
    this.homeService.getTicketCount().subscribe(res => {
      this.ticketCount = res['Data'];
    });
  }

  // This method gets all the open tickets
  getOpenedTicketCount() {
    this.ticketService.getOpenedTicketsCount().subscribe((count: any) => {
      this.openedTicketsCount = count['Data'];
    });
  }

  // This method gets alll the closed tickets
  getClosedTicketsCount() {
    this.ticketService.getClosedTicketsCount().subscribe((count: any) => {
      this.closedTicketsCount = count['Data'];
    });
  }


  // Getter for the Tickets
  getTickets() {
    this.ticketService.getTickets().subscribe((tickets: Itickets) => {
      this.ticketList = tickets['Data'];
    });
  }

  // Getter for the opened Tickets
  getOpenTickets() {
    this.ticketService.getOpenedTickets().subscribe((tickets: Itickets) => {
      this.openedTickets = tickets['Data'];

    });
  }

  // Getter for the closed Tickets
  getClosedTickets() {
    this.ticketService.getTClosedTickets().subscribe((tickets: Itickets) => {
      this.closedTickets = tickets['Data'];
    });
  }


  // Getter for the status list
  getStatusList() {
    this.ticketService.getStatus().subscribe((status: Istatus) => {
      this.statusList = status['Data'];
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
    return Promise.resolve(this.currentTicket);
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

    this.commentForm = this.ticketBuilder.group({
      comments: ['', Validators.required]
    });

    return Promise.resolve()
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

  // This method saves the selected status
  selectedStatus(change: MatSelectChange): Promise<number> {
    this.sId = change.value;
    return Promise.resolve(this.tId)
  }

  // This method handles the date change
  dateChange(event: any): void {
    this.date = event.target.value
  }

  // This method sets the data in the modal
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

  // This method handles the mat-slide-toggle and marks as active and inactive in the databse
  onActiveSlide(event, ticket) {
    if (window.confirm("Do you really want to change the active state of the role?")) {
      this.promiseRoleEditActiveState(ticket, event.checked).then(updatedRole => {
        this.ticketService.updateTicketActiveState(updatedRole).subscribe(res => {
        });
      })
    } else return;
  }
  promiseRoleEditActiveState(ticket, event): Promise<Itickets> {
    let updatedRole: Itickets = {
      ticket_number_pk: ticket.ticket_number_pk,
      active: event
    }
    return Promise.resolve(updatedRole);
  }


  // Handles cancel button in the form and popup for when the user hasn't save the form
  onCancelClick() {
    window.confirm("You have not saved this Ticket, are you sure you want to cancel?")
    this.modalService.closeModal();
  }

  // This method handles adding comments
  addComments(form): void {
    this.promiseAddComments(form).then(newTicket => {
      this.ticketService.addTechnicianComments(newTicket).subscribe(res => {
        this.getTickets();
        this.modalService.closeModal();
      })
    })
  }
  promiseAddComments(ticket): Promise<Itickets> {
    console.log(ticket)
    let newTicket: Itickets = {
      ticket_number_pk: this.currentTicket.ticket_number_pk,
      tech_comments: ticket.comments
    }
    console.log(newTicket)
    return Promise.resolve(newTicket);
  }

  //  This method is for uodating the tickets
  updateTicket(form): void {
    this.promiseTicketUpdate(form).then(newTicket => {
      this.ticketService.updateTicket(newTicket).subscribe(result => {
        this.getTickets();
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

  // This method  sorts the data in the table
  sortData(sort: Sort) {
    const data = this.allTickets.slice();
    if (!sort.active || sort.direction === '') {
      this.allTickets = data;
      return;
    }
    this.allTickets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdDate': return compare(a.created_date, b.created_date, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return compare(a.active, b.active, isAsc);
      }
    });
  }
}

// This method is used for comparing categories in the table 
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
