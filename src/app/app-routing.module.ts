import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { TechnicianAssigmentsComponent } from './users/technicians/technician-assigments/technician-assigments.component';
import { UsersAndTechniciansComponent } from './users/users-and-technicians/users-and-technicians.component';
import { HomeComponent } from './home/home/home.component';
import { TicketCreationComponent } from './tickets/ticket-creation/ticket-creation.component';
import { ShowTicketListComponent } from './tickets/show-ticket-list/show-ticket-list.component';
import { TicketDashboardComponent } from './dashboard/ticket-dashboard/ticket-dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { RoleGuardService as RoleGuard} from './services/role-guard.service';
import { MyTicketComponent } from './tickets/my-ticket/my-ticket.component';

const routes: Routes = [
 //{ path: '**', redirectTo:'/login', pathMatch: "full"} ,
  { path: 'login', component: LogInComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesListComponent, canActivate: [RoleGuard] },
  { path: 'usersandtechnicians', component: UsersAndTechniciansComponent, canActivate: [RoleGuard] },
  { path: 'technicianassigments', component: TechnicianAssigmentsComponent, canActivate: [RoleGuard]},
  { path: 'ticketcreation', component: TicketCreationComponent, canActivate: [AuthGuard]},
  { path: 'showtickets', component: ShowTicketListComponent, canActivate: [RoleGuard]},
  { path: 'dashboard', component: TicketDashboardComponent, canActivate: [RoleGuard]},
  { path: 'mytickets', component: MyTicketComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
