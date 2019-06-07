import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { TechnicianAssigmentsComponent } from './users/technicians/technician-assigments/technician-assigments.component';
import { UsersAndTechniciansComponent } from './users/users-and-technicians/users-and-technicians.component';
import { HomeComponent } from './home/home/home.component';
import { TicketCreationComponent } from './tickets/ticket-creation/ticket-creation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'categories', component: CategoriesListComponent },
  { path: 'usersandtechnicians', component: UsersAndTechniciansComponent },
  { path: 'technicianassigments', component: TechnicianAssigmentsComponent},
  { path: 'ticketcreation', component: TicketCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
