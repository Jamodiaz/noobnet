import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { MaintenanceListComponent } from './common/maintenance/maintenance-list/maintenance-list.component';
import { TechnicianAssigmentsComponent } from './users/technicians/technician-assigments/technician-assigments.component';
import { TestComponent } from './test/test.component';
import { UsersAndTechniciansComponent } from './users/users-and-technicians/users-and-technicians.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesListComponent },
  { path: 'usersandtechnicians', component: UsersAndTechniciansComponent },
  { path: 'maintenance', component: MaintenanceListComponent },
  { path: 'technicianassigments', component: TechnicianAssigmentsComponent},
  { path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
