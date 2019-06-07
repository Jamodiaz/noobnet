import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal.service';


import { MyCommonModule } from './common/my-common.module';

import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { TechnicianAssigmentsComponent } from './users/technicians/technician-assigments/technician-assigments.component';
import { UsersAndTechniciansComponent } from './users/users-and-technicians/users-and-technicians.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { HomeComponent } from './home/home/home.component';
import { TicketCreationComponent } from './tickets/ticket-creation/ticket-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesListComponent,
    CategoriesEditComponent,
    CategoriesDetailComponent,
    TechnicianAssigmentsComponent,
    UsersAndTechniciansComponent,
    EditUsersComponent,
    HomeComponent,
    TicketCreationComponent,
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
