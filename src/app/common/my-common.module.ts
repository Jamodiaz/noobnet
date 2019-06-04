import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSlideToggleModule, MatGridListModule, MatSelectModule, MatRadioModule, MatStepperModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaintenanceModule } from './maintenance/maintenance/maintenance.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
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
    SweetAlert2Module,
    MaintenanceModule,
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatFormFieldModule,
  ]
})
export class MyCommonModule { }
