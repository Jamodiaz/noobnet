import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCommonModule } from '../../my-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalService } from 'src/app/services/modal.service';
import { MaintenanceListComponent } from '../maintenance-list/maintenance-list.component';

@NgModule({
  declarations: [],
  providers: [ModalService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    SweetAlert2Module
  ],
})
export class MaintenanceModule { }
