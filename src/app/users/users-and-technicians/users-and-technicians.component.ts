import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Itechnicians } from '../technicians';
import { MatRadioChange, MatSelectChange } from '@angular/material';
import { Iusers } from './users';
import { Iroles } from '../roles';
import { AuthService } from 'src/app/services/auth.service';
import { promise } from 'protractor';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-users-and-technicians',
  templateUrl: './users-and-technicians.component.html',
  styleUrls: ['./users-and-technicians.component.css']
})
export class UsersAndTechniciansComponent implements OnInit {

  usersEditForm: FormGroup;
  technicians: Itechnicians;
  users: Iusers;
  allUsers: Iusers;
  roles: Iroles;

  currentUser: any;


  idRole: number;


  tableControl: string;

  @Output() change: EventEmitter<MatRadioChange>

  // Angular Material table header
  userColumns: string[] = ['user_id_pk', 'firstname', "lastname", "email", "phone","actions"];

  constructor(private usersFormBuilder: FormBuilder,
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

  formInit(): Promise<void> {
    this.usersEditForm = this.usersFormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      phone: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required]
    });
    return Promise.resolve()
  }

    // This method opens the modal for the create and edit category child component
    openModal(content, user): void {
      this.currentUser = user;
      this.modalService.openModal(content);
    }
  
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

  getRoles() {
    this.usersService.getRoles().subscribe((roles: Iroles) => {
      this.roles = roles['Data']
      console.log(this.roles);
    })
  }

  onChange (changed: MatRadioChange) {
    if(changed.value === "Tech")
       this.tableControl = changed.value;
    else if(changed.value === "Users")
      this.tableControl = changed.value;
    else if(changed.value === "All")
      this.tableControl = changed.value
  }

  createUser(form) {
    if(window.confirm("Do you really want to create this new user?")){
      this.promiseUserCreate(form).then(newUser => {
        this.usersService.createUser(newUser).subscribe(res =>{
          console.log(newUser)
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

  // editUser(user) {

  // }
  // promiseUserEdit(user): Promise<Iusers> {

  // }

}
