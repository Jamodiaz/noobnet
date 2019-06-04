import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Iusers } from '../users-and-technicians/users';
import { Iroles } from '../roles';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  isDirty: boolean = true;
  submitted = false;

  @Input() user: any;
  @Input() roles: Iroles;

  @Output() formValue = new EventEmitter();

  usersEditForm: FormGroup;


  constructor(private modalService: ModalService,
    private usersFormBuilder: FormBuilder) { }

  ngOnInit() {
    this.formInit().then(result => {
      this.formSetData();
      console.log(this.roles)
    })
  }


  formInit(): Promise<void> {
    this.usersEditForm = this.usersFormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required]
    });
    return Promise.resolve()
  }


  formSetData(): void {
    if (this.user != null) {
      this.usersEditForm.controls['firstName'].setValue(this.user.firstname);
      this.usersEditForm.controls['lastName'].setValue(this.user.lastname);
      this.usersEditForm.controls['email'].setValue(this.user.email);
      this.usersEditForm.controls['phone'].setValue(this.user.phone);
    }
  }

  // Handles cancel button in the form and popup for when the user hasn't save the form
  onCancelClick() {
    if (this.isDirty)
      window.confirm("You have not saved this user, are you sure you want to cancel?")
    this.modalService.closeModal();
  }

  // convenience getter for easy access to form fields
  get f() { return this.usersEditForm.controls; }


  onSubmit(form: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.usersEditForm.invalid) {
      return;
    }

    this.formValue.emit(form);

  }

}
