import { Component, OnInit, Input } from '@angular/core';
import { ITechniciansAssigned } from 'src/app/users/categoriesTechnicianAssigned';
import { Itechnicians } from 'src/app/users/technicians';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { ModalService } from 'src/app/services/modal.service';
import { Itabledata } from '../tabledata';
import { MaintenanceModule } from '../maintenance/maintenance.module';


@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})

export class MaintenanceListComponent implements OnInit {

  @Input() Title: string;
  @Input() ButtonAction: string;

  @Input() Icon: string;

  @Input() TableHeaders?: string[];
  @Input() TableData?: any[];
  @Input() TableCurrentData?: Itabledata;

  @Input() Technician?: Itechnicians;
  @Input() Category?: Icategories;
  @Input() TechAssignedCats?: ITechniciansAssigned[];

  @Input() show?: string;

  TechAssignedCat?: ITechniciansAssigned;

  constructor(private modalService: ModalService, private maintenanceModule: MaintenanceModule) { }

  ngOnInit() {
    console.log(this.Title);
    console.log(this.TableData);
  }

    // This method opens modal 
    openModal(content, category, technician): void {
      this.Category = technician;
      this.Technician = category;
      this.modalService.openModal(content);
    }

}

