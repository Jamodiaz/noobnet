import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal.service';

import { MaintenanceListComponent } from './common/maintenance/maintenance-list/maintenance-list.component';

import { MyCommonModule } from './common/my-common.module';
import { TestComponent } from './test/test.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { TechnicianAssigmentsComponent } from './users/technicians/technician-assigments/technician-assigments.component';
import { UsersAndTechniciansComponent } from './users/users-and-technicians/users-and-technicians.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CategoriesListComponent,
    CategoriesEditComponent,
    CategoriesDetailComponent,
    MaintenanceListComponent,
    TechnicianAssigmentsComponent,
    UsersAndTechniciansComponent,
    EditUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyCommonModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule { }
