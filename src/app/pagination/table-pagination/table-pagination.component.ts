import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'table-pagination',
    templateUrl: 'table-pagination.component.html',
    styleUrls: ['table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit {

    // Recieves the item count
    @Input() itemsTotal: number

    // Paginator page number
    @Input() pageNumber: number = 1;

    // Default paginator size
    @Input() pageSize: number = 20;

    // Returns the page number of the paginator
    @Output() page: EventEmitter<number> = new EventEmitter<number>()

    // Total pages in paginator
    private paginatorSize: number;

    ngOnInit(){
        this.paginatorSize = Math.ceil(this.itemsTotal / this.pageSize)
    }

    // Returns the total pages in the paginator
    getPaginatorSize(): number { 
        return this.paginatorSize;
    }

    // Function called when left arrow is pressed
    goToPrevPage() {
        if(this.pageNumber > 1) 
            this.page.emit(this.pageNumber = +this.pageNumber - 1);
    }

    // Function called when right arrow is pressed
    goToNextPage(){
        if(this.pageNumber < this.paginatorSize)
            this.page.emit(this.pageNumber = +this.pageNumber + 1);
    }

    // Function executed when the value of the page number input is changed and submitted.
    changedPageNumInput(event:any) {
        if(event.target.value < 1)
            this.page.emit(this.pageNumber = 1);
        else if(event.target.value > this.paginatorSize) 
            this.page.emit(this.pageNumber = this.paginatorSize);
        else if (event.target.value >= 1 || event.target.value <= this.paginatorSize)
            this.page.emit(this.pageNumber = event.target.value);
        else
            alert('Invalid page number.');
    }
}
