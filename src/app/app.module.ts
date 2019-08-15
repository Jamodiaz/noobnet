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
import { ShowTicketListComponent } from './tickets/show-ticket-list/show-ticket-list.component';
import { TicketDashboardComponent } from './dashboard/ticket-dashboard/ticket-dashboard.component';


import { GoogleChartsModule } from 'angular-google-charts';
import { TablePaginationComponent } from './pagination/table-pagination/table-pagination.component';
import { LogInComponent } from './log-in/log-in.component';
import { JwtHelperService, JWT_OPTIONS, JwtModule  } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyTicketComponent } from './tickets/my-ticket/my-ticket.component';
import { ProfileComponent } from './profile/profile.component';


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
    ShowTicketListComponent,
    TicketDashboardComponent,
    TablePaginationComponent,
    LogInComponent,
    NavBarComponent,
    MyTicketComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyCommonModule,
    GoogleChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return   localStorage.getItem('access_token');},
        // whitelistedDomains: ['localhost:'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],
  exports: [
    
  ],
  providers: [ModalService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, AuthGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }

