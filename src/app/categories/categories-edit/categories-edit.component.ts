import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icategories } from '../interfaces/categories';
import { Itechnicians } from 'src/app/users/technicians';
import { CategoriesService } from '../categories.service';
import { UsersService } from 'src/app/users/users.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css'],
})

export class CategoriesEditComponent implements OnInit {

  isDirty: boolean = true

  categoriesEditForm: FormGroup;
  submitted = false;
  technicians: Array<Itechnicians> = new Array<Itechnicians>();

  @Input() category: Icategories = null;

  @Input() technician: Itechnicians = null;

  @Output() formValue = new EventEmitter();

  constructor(private categoriesBuilder: FormBuilder,
    private modalService: ModalService) { }

  ngOnInit() {
    this.formInit().then(result => {
      this.formSetData();
    })

  }

  formInit(): Promise<void> {
    this.categoriesEditForm = this.categoriesBuilder.group({
      categoryType: ['', Validators.required],
      categoryDescription: ['', Validators.required],
    });
    return Promise.resolve()
  }

  // Sets the corresponding data to the form
  formSetData(): void {
    if (this.category != null) {
      this.categoriesEditForm.controls['categoryType'].setValue(this.category.category_type);
      this.categoriesEditForm.controls['categoryDescription'].setValue(this.category.category_description);
    }
  }

  // Handles cancel button in the form and popup for when the user hasn't save the form
  onCancelClick() {
    if (this.isDirty)
      window.confirm("You have not saved this category, do you really want to cancel?")
    this.modalService.closeModal();
  }


  // convenience getter for easy access to form fields
  get f() { return this.categoriesEditForm.controls; }

  onSubmit(form: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoriesEditForm.invalid) {
      return;
    }

    this.formValue.emit(form);

  }

}
