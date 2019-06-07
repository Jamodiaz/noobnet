import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Itechnicians } from '../technicians';
import { MatRadioChange, MatSelectChange } from '@angular/material';
import { Iusers } from './users';
import { Iroles } from '../roles';
import { AuthService } from 'src/app/services/auth.service';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-users-and-technicians',
  templateUrl: './users-and-technicians.component.html',
  styleUrls: ['./users-and-technicians.component.css']
})
export class UsersAndTechniciansComponent implements OnInit {

  isDirty: boolean;
  roleForm: FormGroup;
  roleEditForm: FormGroup;
  usersEditForm: FormGroup;
  technicians: Itechnicians;
  users: Iusers;
  allUsers: Iusers;
  roles: Iroles;
  currentUser: any;
  idRole: number;
  tableControl: string;
  currentRole: Iroles;

  // Event handler for the material radio buttonj
  @Output() change: EventEmitter<MatRadioChange>

  // Angular Material table header for users
  userColumns: string[] = ['user_id_pk', 'firstname', "lastname", "email", "phone", "actions"];

  // Angular Material table header for roles
  roleColumns: string[] = ['role_id_pk', 'role_type', "actions"];

  constructor(private usersFormBuilder: FormBuilder,
    private rolesBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private auth: AuthService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.formInit().then(result => {
      this.getTechnicians();
      this.getUsers();
      this.getUsersAndTechnicians();
      this.getRoles();
    })
  }

  // Method to initialize form
  formInit(): Promise<void> {
    this.usersEditForm = this.usersFormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.roleForm = this.rolesBuilder.group({
      roleType: ['', Validators.required],
    });

    this.roleEditForm = this.rolesBuilder.group({
      roleType: ['', Validators.required],
    });

    return Promise.resolve()
  }

// Sets the data for editing the role type
  formSetData(role): void {
    console.log("perrito")
    this.currentRole = role;
    console.log(this.currentRole)
      this.roleEditForm.controls['roleType'].setValue(role.role_type);
  }

  // This method opens the modal for the create and edit category child component
  openModal(content, user): void {
    this.isDirty = true;
    this.currentUser = user;
    this.modalService.openModal(content);
  }


  // Saves the id of the current selected role in the angular material select dropdown
  selectedRole(change: MatSelectChange): Promise<number> {
    this.idRole = change.value;
    return Promise.resolve(this.idRole);
  }

  // Getter for the technicians
  getTechnicians() {
    this.usersService.getTechnicians().subscribe((technicians: Itechnicians) => {
      this.technicians = technicians['Data'];
    })
  }

  // Getter for the users
  getUsers() {
    this.usersService.getUsers().subscribe((users: Iusers) => {
      this.users = users['Data'];
      console.log(this.users);
    })
  }

  // Getter for all users
  getUsersAndTechnicians() {
    this.usersService.getAllUsers().subscribe((all: Iusers) => {
      this.allUsers = all['Data'];
      console.log(this.allUsers);
    })
  }

  // Getter for the roles
  getRoles() {
    this.usersService.getRoles().subscribe((roles: Iroles) => {
      this.roles = roles['Data']
      console.log(this.roles);
    })
  }

  // Method that handles the angular material radio buttons 
  onChange(changed: MatRadioChange) {
    if (changed.value === "Tech")
      this.tableControl = changed.value;
    else if (changed.value === "Users")
      this.tableControl = changed.value;
    else if (changed.value === "All")
      this.tableControl = changed.value
  }

  // Method that creates a new user
  createUser(form): void {
    if (window.confirm("Do you really want to create this new user?")) {
      this.promiseUserCreate(form).then(newUser => {
        this.usersService.createUser(newUser).subscribe(res => {
          this.getUsers();
          this.getTechnicians();
          this.getUsersAndTechnicians();
        })
      })
    }
  }
  promiseUserCreate(user): Promise<Iusers> {
    let newUser: Iusers = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      created_by: this.auth.userTechnician.user_id_pk,
      role_type_fk: this.idRole
    }

    return Promise.resolve(newUser);
  }


  // Method for editing the current selected user
  editUser(form): void {
    this.promiseUserEdit(form).then(newUser => {
      console.log(newUser)
      this.usersService.editUser(newUser).subscribe(res => {
        console.log(newUser)
        this.getUsers();
        this.getTechnicians();
        this.getUsersAndTechnicians();
        this.modalService.closeModal();
      });
    });
  }
  promiseUserEdit(user): Promise<Iusers> {
    let newUser: Iusers = {
      user_id_pk: this.currentUser.user_id_pk,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      modified_by: this.auth.userTechnician.user_id_pk,
      role_type_fk: user.role
    }
    return Promise.resolve(newUser);
  }

  createRole(role):void {
    if(window.confirm("Do you really want to create this role?")){
    this.promiseCreateRole(role).then(newRole =>{
      this.usersService.createRole(newRole).subscribe( res =>{
        this.getRoles();
      });
    });
    }
  }
  promiseCreateRole(role): Promise<Iroles> {
    let newRole: Iroles = {
      role_type: role.roleType,
      created_by: this.auth.userTechnician.user_id_pk,
      active: true
  }
  return Promise.resolve(newRole);
  }

  editRole(role):void {
    this.promiseEditRole(role).then(newRole =>{
      this.usersService.updateRole(newRole).subscribe( res =>{
        this.getRoles();
        this.modalService.closeModal();
      });
    });
  }
  promiseEditRole(role): Promise<Iroles> {
    let newRole: Iroles = {
      role_id_pk: this.currentRole.role_id_pk,
      role_type: role.roleType,
      modified_by: this.auth.userTechnician.user_id_pk,
      active: true
  }
  return Promise.resolve(newRole);
  }

  // Handles cancel button in the form and popup for when the user hasn't save the form
  onCancelClick() {
    window.confirm("You have not saved this ROLE, are you sure you want to cancel?")
    this.modalService.closeModal();
  }

  // This method handles the mat-slide-toggle and marks as active and inactive in the databse
  onActiveSlide(event, role) {
    if(window.confirm("Do you really want to change the active state of the role?")){
      this.promiseRoleEditActiveState(role, event.checked).then(updatedRole => {
        this.usersService.updateRoleActiveState(updatedRole).subscribe(res => {
          this.getRoles();
        });
      })
    }else return;
  }
  promiseRoleEditActiveState(role, event): Promise<Iroles> {
    let updatedRole: Iroles = {
      role_id_pk: role.role_id_pk,
      active: event
    }
    return Promise.resolve(updatedRole);
  }
}