import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { MatSelectChange } from '@angular/material';
import { TicketService } from '../ticket.service';
import { Istatus } from './status';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {

  activeCategories: Icategories;
  cId: number;

  statusList: Istatus;

  ticketForm: FormGroup;

  constructor(private ticketBuilder: FormBuilder,
     private categoriesService: CategoriesService,
     private ticketService: TicketService) { }

  ngOnInit() {
    this.formInit().then( result => {
      this.getActiveCategories();
      this.getStatusList();
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


    getActiveCategories() {
      this.categoriesService.getActiveCategories().subscribe((cats: Icategories) => {
        this.activeCategories = cats['Data']
        console.log(this.activeCategories)
      });
    }

    getStatusList() {
      this.ticketService.getStatus().subscribe((status: Istatus) => {
        this.statusList = status['Data'];
        console.log(this.statusList)
      });
    }

    
    // This method saves the selected category id
  selectedCat(change: MatSelectChange): Promise<number>{
    this.cId = change.value;
    return Promise.resolve(this.cId)
  }

}
