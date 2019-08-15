import { Component, OnInit, NgProbeToken, NgModuleFactoryLoader, Output } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Icategories } from '../interfaces/categories';
import { ModalService } from 'src/app/services/modal.service';
import { Itechnicians } from 'src/app/users/technicians';
import { Sort, MatRadioChange } from '@angular/material';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from 'src/app/home/home/home.component';
import { MyHomeService } from 'src/app/home/home/my-home.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  tableControl: string = "Active";

  keywordForm: FormGroup;

  keyword: string = "_";
  pSize: number = 6;
  pageNum: number = 1;

  catCols: string[] = ["category_id_pk", "category_type", "created_date", "info", "edit", "active"];

  allCategories: Icategories;
  allCategoriesCount: number;

  catCount: number;
  activeCatCount: number;
  inactiveCatCount: number;

  constructor(private categoriesService: CategoriesService,
    private modalService: ModalService,
    private authService: AuthService, private homeService: MyHomeService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.promiseForTable(this.pageNum);
    this.formInit();
    this.getCategoriesCount();
    this.getActiveCatCount();
    this.getInactiveCatCount();
  }

  // Init for the form
  formInit(): Promise<void> {
    this.keywordForm = this.formBuilder.group({
      keyword: [""]
    });

    return Promise.resolve();
  }

  
  // Method that handles the angular material radio buttons 
  onChange(changed: MatRadioChange) {
    if (changed.value === "Active")
      this.tableControl = changed.value;
    else if (changed.value === "Inactive")
      this.tableControl = changed.value;

    this.promiseForTable(this.pageNum);
  }

  // This method handles the search bar
  onSearchChange(event: string) {
    this.keyword = event;
    this.promiseForTable(this.pageNum);
  }

  // This method gets all the data for the table
  async promiseForTable(event: any) {
    this.pageNum = event;
    if(this.tableControl === "Active") {
      let cat = await this.categoriesService.getCategoriesSearch(this.keyword,this.pageNum,this.pSize);
      this.allCategories = cat["Data"];
      let count = await this.categoriesService.getCategoriesSearchCount(this.keyword);
      this.allCategoriesCount = count['Data'];
    }
    else if (this.tableControl === "Inactive") {
      let cat = await this.categoriesService.getCategoriesInactiveSearch(this.keyword,this.pageNum,this.pSize);
      this.allCategories = cat["Data"];
      let count = await this.categoriesService.getCategoriesInactiveSearchCount(this.keyword);
      this.allCategoriesCount = count['Data'];
    }
    
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
          this.promiseForTable(this.pageNum);
          this.getActiveCatCount()
          this.getInactiveCatCount();
        });
      })
    }else return;;
  }
  promiseCategoryEditActiveState(category, event): Promise<Icategories> {
    let updatedCategory: Icategories = {
      category_id_pk: category.category_id_pk,
      active: event
    }
    return Promise.resolve(updatedCategory);
  }

  // This methods gets all categories count
  getCategoriesCount() {
    this.homeService.getCategoriesCount().subscribe(res => {
      this.catCount = res['Data'];
    });
  }

  // This method gets all the active categories count
  getActiveCatCount() {
    this.categoriesService.categoryActiveCount().subscribe((count: any) => {
      this.activeCatCount = count['Data'][0];
    });
  }

  // This methods gets all the inactive categories count
  getInactiveCatCount() {
    this.categoriesService.categoryInactiveCount().subscribe((count: any) => {
      this.inactiveCatCount = count['Data'][0];
    });
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
        this.promiseForTable(this.pageNum);
      });
    })
  }
  promiseCategoryCreate(category): Promise<Icategories> {
    console.log(category);
    let newCategory: Icategories = {
      category_type: category.categoryType,
      category_description: category.categoryDescription,
      created_by: this.authService.authenticated.User_id_pk
    }
    return Promise.resolve(newCategory);
  }

  // Edits an existing category and updates it in the database
  editCategory(category): void {
    console.log(category);
    this.promiseCategoryEdit(category).then(updatedCategory => {
      this.categoriesService.updateCategory(updatedCategory).subscribe(res => {
        this.modalService.closeModal();
        this.promiseForTable(this.pageNum);
      });
    })
  }
  promiseCategoryEdit(category): Promise<Icategories> {
    let updatedCategory: Icategories = {
      category_id_pk: this.saveCurrentId(),
      category_type: category.categoryType,
      category_description: category.categoryDescription,
      modified_by: this.authService.authenticated.User_id_pk
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