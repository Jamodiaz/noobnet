import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, 
  MatSlideToggleModule, MatGridListModule, MatSelectModule, MatRadioModule, MatStepperModule, 
  MatFormFieldModule, MatMenuModule, MatCheckboxModule, MatIconModule, MatNativeDateModule, 
  MatOptionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NavigateComponent } from './navigate/navigate.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
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
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatOptionModule
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
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatOptionModule
  ]
})
export class MyCommonModule { }
