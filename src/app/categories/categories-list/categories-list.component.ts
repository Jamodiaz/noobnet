import { Component, OnInit, NgProbeToken, NgModuleFactoryLoader, Output } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Icategories } from '../interfaces/categories';
import { ModalService } from 'src/app/services/modal.service';
import { Itechnicians } from 'src/app/users/technicians';
import { Sort } from '@angular/material';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  providers: [
  ]
})
export class CategoriesListComponent implements OnInit {

  // Controllers for data
  categories: Icategories[];
  currentCategory: Icategories;
  technicians: Itechnicians[];
  currentTechnician: Itechnicians;

  constructor(private categoriesService: CategoriesService,
    private modalService: ModalService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCategories();
  }

  // This method saves the id of the selected category
  saveCurrentId() {
    return this.currentCategory.category_id_pk;
  }

  // This method saves the current actrive state (active or inactive) od the current category
  saveCurrentActiveState() {
    return this.currentCategory.active;
  }

  // This method handles the mat-slide-toggle and marks as active and inactive in the databse
  onActiveSlide(event, category) {
    if(window.confirm("Do you really want to change the activE state of the category?")){
      this.promiseCategoryEditActiveState(category, event.checked).then(updatedCategory => {
        this.categoriesService.updateCategoryActiveState(updatedCategory).subscribe(res => {
          this.getCategories();
        });
      })
    }else return;
  }
  promiseCategoryEditActiveState(category, event): Promise<Icategories> {
    let updatedCategory: Icategories = {
      category_id_pk: category.category_id_pk,
      active: event
    }
    return Promise.resolve(updatedCategory);
  }

  // This method gets all the categories 
  getCategories() {
    this.categoriesService.getCategoriesList().subscribe((categories: Icategories) => {
      console.log('getCategories: ', categories);
      this.categories = categories['Data'];
    })
  }

  // This method opens the modal for the create and edit category child component
  openModal(content, category, technician): void {
    this.currentTechnician = technician;
    this.currentCategory = category;
    this.modalService.openModal(content);
  }

  // Creates a new Category and saves it in the database
  createCategory(category): void {
    this.promiseCategoryCreate(category).then(newCategory => {
      this.categoriesService.createCategory(newCategory).subscribe(res => {
        this.modalService.closeModal();
        this.getCategories();
      });
    })
  }
  promiseCategoryCreate(category): Promise<Icategories> {
    console.log(category);
    let newCategory: Icategories = {
      category_type: category.categoryType,
      category_description: category.categoryDescription,
      created_by: this.authService.userTechnician.user_id_pk
    }
    return Promise.resolve(newCategory);
  }

  // Edits an existing category and updates it in the database
  editCategory(category): void {
    console.log(category);
    this.promiseCategoryEdit(category).then(updatedCategory => {
      this.categoriesService.updateCategory(updatedCategory).subscribe(res => {
        this.modalService.closeModal();
        this.getCategories();
      });
    })
  }
  promiseCategoryEdit(category): Promise<Icategories> {
    let updatedCategory: Icategories = {
      category_id_pk: this.saveCurrentId(),
      category_type: category.categoryType,
      category_description: category.categoryDescription,
      modified_by: this.authService.userTechnician.user_id_pk
    }
    return Promise.resolve(updatedCategory);
  }

  // This method is used for sorting the table elements in the screen 
  sortData(sort: Sort) {
    const data = this.categories.slice();
    if (!sort.active || sort.direction === '') {
      this.categories = data;
      return;
    }

    this.categories = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'categoryType': return compare(a.category_type, b.category_type, isAsc);
        case 'active': return compare(a.active, b.active, isAsc);
        default: return compare(a.active, b.active, isAsc);
      }
    });

  }
}

// This method is used for comparing categories in the table 
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}