import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Iauth } from '../services/auth';
import { LogInService } from '../log-in/log-in.service';
import { ModalService } from '../services/modal.service';
import { Iusers } from '../users/users-and-technicians/users';
import { UsersService } from '../users/users.service';
import { Iroles } from '../users/roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authenticated: Iauth;
  role: any;
  isDirty: boolean = false;
  currentUser: any;
  roles: Iroles;

  constructor(private auth: AuthService,
    private log: LogInService,
    private modalService: ModalService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.authenticated = this.auth.authenticated;
    this.role = localStorage.getItem('Role');
    this.getRoles();
  }

  logOut() {
    if (window.confirm("Are you sure you want to log out?"))
          this.log.logout();
  }

  // Method for editing the current selected user
  editUser(form): void {
    this.promiseUserEdit(form).then(newUser => {
      this.usersService.editUser(newUser).subscribe(res => {
        this.modalService.closeModal();
      });
    });
  }
  promiseUserEdit(user): Promise<Iusers> {
    let newUser: Iusers = {
      User_id_pk: this.currentUser.User_id_pk,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      modified_by: this.auth.authenticated.User_id_pk,
      Role_type_fk: user.role
    }
    return Promise.resolve(newUser);
  }


  // Getter for the roles
  getRoles() {
    this.usersService.getRoles().subscribe((roles: Iroles) => {
      this.roles = roles['Data']
      console.log(this.roles);
    })
  }

  openModal(content): void {
    this.isDirty = true;

    this.currentUser = {
      User_id_pk: this.authenticated.User_id_pk,
      firstName: this.authenticated.Firstname,
      lastName: this.authenticated.Lastname,
      phone: this.authenticated.Phone,
      email: this.authenticated.Email,
      role_type_fk: this.authenticated.Role_type_fk
    }
    console.log(this.currentUser)
    this.modalService.openModal(content);
  }



}
