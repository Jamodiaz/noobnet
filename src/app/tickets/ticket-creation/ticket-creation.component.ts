import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { MatSelectChange } from '@angular/material';
import { TicketService } from '../ticket.service';
import { Istatus } from './status';
import { UsersService } from 'src/app/users/users.service';
import { ITechniciansAssigned } from 'src/app/users/categoriesTechnicianAssigned';
import { Itickets } from '../ticket';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {

  activeCategories: Icategories;
  ticketList: Itickets;

  created: boolean = false;

  ticketsCols: string[] = ["ticket_number_pk", "name", "created_date", "actions"];

  // ID'S
  cId: number;
  tId: number;
  openStatusId: number;

  date: Date;

  statusList: Istatus;

  ticketForm: FormGroup;
  

  techAssigned: ITechniciansAssigned;

  constructor(private ticketBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private userService: UsersService,
    private ticketService: TicketService,
    private auth: AuthService) { }

  ngOnInit() {
    this.getOpenStatusId();
    this.formInit().then(result => {
      this.getActiveCategories();
      this.getStatusList();
      this.getTickets();
    });
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
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
      role: ['', Validators.required],
      active: ['', Validators.required]
    });


    return Promise.resolve()
  }

  async getOpenStatusId() {
    let id: any = await this.ticketService.getOpenStatusId();
    this.openStatusId = id['Data'];
  }


  getActiveCategories() {
    this.categoriesService.getActiveCategories().subscribe((cats: Icategories) => {
      this.activeCategories = cats['Data']
    });
  }

  getStatusList() {
    this.ticketService.getStatus().subscribe((status: Istatus) => {
      this.statusList = status['Data'];
    });
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((tickets: Itickets) =>{
      this.ticketList = tickets['Data'];
      console.log(this.ticketList);
    });
  }

  // This method saves the selected category id
  selectedCat(change: MatSelectChange): Promise<number> {
    this.cId = change.value;
    this.getTechniciansByCatAssigned();
    return Promise.resolve(this.cId)
  }

  // This method saves the selected technician id
  selectedTechnician(change: MatSelectChange): Promise<number> {
    this.tId = change.value;
    return Promise.resolve(this.tId)
  }



  getTechniciansByCatAssigned() {
    this.userService.getTechniciansByCategoryAssigned(this.cId).subscribe((techAssigned: ITechniciansAssigned) => {
      this.techAssigned = techAssigned['Data'];
      console.log(this.techAssigned)
    })
  }

  dateChange(event: any): void {
    this.date = event.target.value
    console.log(this.date);
  }


  createTicket(form): void {
    if(window.confirm("Do you really want to create this Ticket?")) {
      this.promiseTicketCreate(form).then(newTicket => {
        this.ticketService.createTicket(newTicket).subscribe(result => {
          this.getTickets();    
          this.created = true;
        });
      });
    }

  }

  promiseTicketCreate(ticket): Promise<Itickets> {
    let newTicket: Itickets = {
      name: ticket.name,
      description: ticket.description,
      status_fk: this.openStatusId,
      category_fk: this.cId,
      created_by: this.auth.authenticated.User_id_pk,
      created_date: this.date,
      active: true
    }
    return Promise.resolve(newTicket);
  }

}
