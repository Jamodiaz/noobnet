import { Component, OnInit } from '@angular/core';
import { TechnicianAssigmentsService } from './technician-assigments.service';
import { ITechniciansAssigned } from '../../categoriesTechnicianAssigned';
import { Itechnicians } from '../../technicians';
import { UsersService } from '../../users.service';
import { ModalService } from 'src/app/services/modal.service';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { AuthService } from 'src/app/services/auth.service';
import { MatSelectChange, Sort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-assigments',
  templateUrl: './technician-assigments.component.html',
  styleUrls: ['./technician-assigments.component.css']
})
export class TechnicianAssigmentsComponent implements OnInit {

  // Controllers for data
  allAssigned: ITechniciansAssigned[];
  technicianAssigned: ITechniciansAssigned;
  technicians: Itechnicians[];
  categories: Icategories[];

  // Technician and Category ID
  id: number;
  cId: number;

  // Angular Material table header
  displayedColumns: string[] = ['id_category_pk_fk','category_type',"actions"];

  constructor(private modalService: ModalService,
    private techAssignedService: TechnicianAssigmentsService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getTechnicians();
  }

  /* 
  This method saves the selected technician ID and handles getting 
  the assigned and not assigned categories
  */
  selectedTech(change: MatSelectChange): Promise<number>{
    this.id = change.value;
    this.getTechnicianAssignments();
    this.getNotAssignedCategories();
    return Promise.resolve(this.id)
  }

  // This method saves the selected category id
  selectedCat(change: MatSelectChange): Promise<number>{
    this.cId = change.value;
    return Promise.resolve(this.cId)
  }

  // This method opens the modal for the TODO
  openModal(content, assigned): void {
    this.technicianAssigned = assigned;
    this.modalService.openModal(content);
  }

  // Getter for the Technician Assignments
  getTechnicianAssignments () {
    this.techAssignedService.getTechnicianAssignedCategories(this.id).subscribe((technicianAssigned: ITechniciansAssigned) => {
      this.allAssigned = technicianAssigned['Data'];
      console.log(technicianAssigned['Data'])
      console.log(this.allAssigned)
    })
  }

  // Getter for the not assigned categories
  getNotAssignedCategories() {
    this.techAssignedService.getTechnicianNotAssignedCategories(this.id).subscribe((categories: Icategories) =>{
      this.categories = categories['Data'];
    });
  }

  // Getter for the technicians
  getTechnicians() {
    this.usersService.getTechnicians().subscribe((technicians: Itechnicians) => {
      this.technicians = technicians['Data']
      this.router.navigate(['technicianassigments']);
    })
  }

// This method creates a new assigned category and updates it in the database
  createAssigned(): void {
    let newAssigned: ITechniciansAssigned = {
      id_user_pk_fk: this.id,
      id_category_pk_fk: this.cId,
      created_by: this.authService.userTechnician.user_id_pk
    }
    if(window.confirm("Do you really want to assign this category?")) {
      this.techAssignedService.createTechnicianAssigned(newAssigned).subscribe(res =>{
        this.getTechnicianAssignments();
      });
    }
  }

  // This method removes an assigned category from a Technician
  removeCategoryAssigned(techId: number, catId: number ){
    if(window.confirm("Do you really want to remove the assigned category?")){
    this.techAssignedService.removeTechnicianAssigned(techId, catId).subscribe(res => {
      this.getTechnicianAssignments();
    });
    }
}

}


