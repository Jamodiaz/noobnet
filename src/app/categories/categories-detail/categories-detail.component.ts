import { Component, OnInit, Input } from '@angular/core';
import { Icategories } from '../interfaces/categories';
import { CategoriesService } from '../categories.service';
import { Itechnicians } from 'src/app/users/technicians';
import { ModalService } from 'src/app/services/modal.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent implements OnInit {

  @Input() category: Icategories;
  @Input() categoryId: number;

  @Input() technician: Itechnicians;

  constructor(private categoriesService:CategoriesService, private modalService: ModalService) { }

  ngOnInit() {
   
  }

  closeInfo() {
    this.modalService.closeModal();
  }

}
