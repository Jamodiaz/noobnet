import { Component, OnInit } from '@angular/core';
import { SelectByIdService } from 'src/app/common/select-by-id.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { TicketService } from 'src/app/tickets/ticket.service';
import { Itechnicians } from 'src/app/users/technicians';
import { Icategories } from 'src/app/categories/interfaces/categories';
import { MyHomeService } from 'src/app/home/home/my-home.service';
import { DashboardService } from './dashboard.service';
import { MatSelectChange, Sort, MatRadioChange } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { Istatus } from 'src/app/tickets/ticket-creation/status';

@Component({
  selector: 'app-ticket-dashboard',
  templateUrl: './ticket-dashboard.component.html',
  styleUrls: ['./ticket-dashboard.component.css']
})
export class TicketDashboardComponent implements OnInit {

  tableControl: string = "All";

  defaultTech: number;
  defaultCat: number;
  defaultStat: number;

  idTc: number;
  technicians: Itechnicians;
  idCt: number;
  categories: Icategories;
  idSt: number;
  status: Istatus;

  keyword: string = "Open";
  pSize: number = 6;
  pageNum: number = 1;

  allTickets: any;
  universalCount: number;

  keywordForm: FormGroup;

  roleCount: number;
  ticketCount: number;
  catCount: number;
  techCount: number;
  clientCount: number;

  monthsNumber: any;
  ticketCreatedMonthCount: any;

  myArrayMonthControler: number[];
  createdYears: number[];

  currentYear: number;
  year: number;

  ticketsCols: string[] = ["ticket_number_pk", "name", "firstname",
    "lastname", "category_type", "status", "created_date"];

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']

  technicianMaxClosedId: number;
  technicianMaxOpenedId: number;
  categoryMostTicketsId: number;

  technicianMaxClosed: Itechnicians;
  technicianMaxOpened: Itechnicians;
  categoryMostTickets: Icategories;

  technicianMaxClosedCount: number;
  technicianMaxOpenedCount: number;
  categoriesMostTicketCount: number;
  activeCatCount: number;
  inactiveCount: number;
  openedTicketsCount: number;
  closedTicketsCount: number;

  constructor(private selectByIdService: SelectByIdService,
    private ticketService: TicketService,
    private categoriesService: CategoriesService,
    private homeService: MyHomeService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder, private userService: UsersService) { }


  // Google Chart: Monthly Recap
  title = 'Tickets Created Per Month';
  type = 'BarChart';
  data = [];
  columnNames = ['Month', 'Amount'];
  options = {
    colors: ['#475283'],
    titleTextStyle: {
      color: '#091D3C',
      fontName: 'helvetica',
      fontSize: 40,
      bold: true,
      italic: false
    },
    color: '#091D3C',
    hAxis: {
      textStyle: { color: '#091D3C' }
    },
    yAxis: {
      textStyle: { color: '#091D3C' }
    },
    fontSize: 20,
    backgroundColor: '#D3D6E1',
    chartArea: {
      backgroundColor: {
        stroke: ' #091D3C',
        strokeWidth: 100
      }
    }
  };
  width = 970;
  height = 530;

  ngOnInit() {
    this.getCategories();
    this.getTechnicians();
    this.getStatusList();
    this.formInit().then(res => {
    });
    this.getTechCount();
    this.getClientCount();
    this.getCategoriesCount();
    this.getTicketCount();
    this.getRoleCount();
    this.getTechnicianMaxClosed();
    this.getTechnicianMaxOpened();
    this.getMaxOpenedCount();
    this.getMaxClosedCount();
    this.getCategoryMostTickets();
    this.getOpenedTicketCount();
    this.getClosedTicketsCount();
    this.getCategoryMostCount();
    this.getActiveCatCount();
    this.getInactiveCatCount();
    this.currentDate().then(res => {
      this.promiseForChart().then(res => {
        this.promiseTable(this.pageNum);
       
      });
    })
  }

  formInit(): Promise<void> {

    this.keywordForm = this.formBuilder.group({
      keyword: [""]
    });

    return Promise.resolve();
  }

  assignData(arr: number[], count: number[]): Promise<any> {

    this.myArrayMonthControler = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 12; i++) {
      if (arr[i] === 1)
        this.myArrayMonthControler[0] = count[i];
      else if (arr[i] === 2)
        this.myArrayMonthControler[1] = count[i];
      else if (arr[i] === 3)
        this.myArrayMonthControler[2] = count[i];
      else if (arr[i] === 4)
        this.myArrayMonthControler[3] = count[i];
      else if (arr[i] === 5)
        this.myArrayMonthControler[4] = count[i];
      else if (arr[i] === 6)
        this.myArrayMonthControler[5] = count[i];
      else if (arr[i] === 7)
        this.myArrayMonthControler[6] = count[i];
      else if (arr[i] === 8)
        this.myArrayMonthControler[7] = count[i];
      else if (arr[i] === 9)
        this.myArrayMonthControler[8] = count[i];
      else if (arr[i] === 10)
        this.myArrayMonthControler[9] = count[i];
      else if (arr[i] === 11)
        this.myArrayMonthControler[10] = count[i];
      else if (arr[i] === 12)
        this.myArrayMonthControler[11] = count[i];
      else {
        this.myArrayMonthControler[i + 1] = null;
      }
    }

    this.data = [
      ["Jan", this.myArrayMonthControler[0]],
      ["Feb", this.myArrayMonthControler[1]],
      ["March", this.myArrayMonthControler[2]],
      ["Apr", this.myArrayMonthControler[3]],
      ["May", this.myArrayMonthControler[4]],
      ["Jun", this.myArrayMonthControler[5]],
      ["Jul", this.myArrayMonthControler[6]],
      ["Aug", this.myArrayMonthControler[7]],
      ["Sep", this.myArrayMonthControler[8]],
      ["Oct", this.myArrayMonthControler[9]],
      ["Nov", this.myArrayMonthControler[10]],
      ["Dic", this.myArrayMonthControler[11]],
    ];
    return Promise.resolve(this.data);
  }


  // Method that handles the angular material radio buttons 
  onChange(changed: MatRadioChange) {
    if (changed.value === "Tech")
      this.tableControl = changed.value;
    else if (changed.value === "Cat")
      this.tableControl = changed.value;
    else if (changed.value === "Stat")
      this.tableControl = changed.value;
    else if (changed.value === "All")
      this.tableControl = changed.value;

    this.promiseTable(this.pageNum);
  }


  // Saves the id of the current selected technician in the angular material select dropdown
  selectedTech(change: MatSelectChange): Promise<number> {
    this.idTc = change.value;
    this.promiseTable(this.pageNum);
    return Promise.resolve(this.idTc);
  }

  // Saves the id of the current selected category in the angular material select dropdown
  selectedCat(change: MatSelectChange): Promise<number> {
    this.idCt = change.value;
    this.promiseTable(this.pageNum);
    return Promise.resolve(this.idCt);
  }

  // Saves the id of the current selected status in the angular material select dropdown
  selectedStat(change: MatSelectChange): Promise<number> {
    this.idSt = change.value;
    this.promiseTable(this.pageNum);
    return Promise.resolve(this.idSt);
  }


  // This method is used for sorting the table elements in the screen 
  sortData(sort: Sort) {
    const data = this.allTickets.slice();
    if (!sort.active || sort.direction === '') {
      this.allTickets = data;
      return;
    }

    this.allTickets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdDate': return compare(a.created_date, b.created_date, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return compare(a.active, b.active, isAsc);
      }
    });

  }

  onSearchChange(event: string) {
    this.keyword = event;
    this.promiseTable(this.pageNum);
  }

  async currentDate() {
    let res: any = await this.dashboardService.getCurrentYear();
    this.currentYear = res['Data'];
    this.year = +this.currentYear;
    return Promise.resolve(this.year);
  }

  async promiseTable(event: any) {
    this.pageNum = event;
    let tickets: any;
    let count: any;
    if (this.tableControl === "All") {
      tickets = await this.dashboardService.getUniversalSearch(this.keyword, this.pageNum, this.pSize);
      this.allTickets = tickets['Data'];
      count = await this.dashboardService.getUniversalSearchCount(this.keyword);
      this.universalCount = count['Data'];
    }
    else if (this.tableControl === "Tech") {
       tickets = await this.dashboardService.getTechnicianSearch(this.keyword, this.pageNum, this.pSize, this.idTc);
       this.allTickets = tickets['Data'];
       count = await this.dashboardService.getTechnicianSearchCount(this.keyword, this.idTc);
       this.universalCount = count['Data'];
    }
    else if (this.tableControl === "Cat") {
      tickets = await this.dashboardService.getCategorySearch(this.keyword, this.pageNum, this.pSize, this.idCt);
      this.allTickets = tickets['Data'];
      count = await this.dashboardService.getCategorySearchCount(this.keyword, this.idCt);
      this.universalCount = count['Data'];
    }
    else if (this.tableControl === "Stat") {
      tickets = await this.dashboardService.getStatusSearch(this.keyword, this.pageNum, this.pSize, this.idSt);
      this.allTickets = tickets['Data'];
      count = await this.dashboardService.getStatusSearchCount(this.keyword, this.idSt);
      this.universalCount = count['Data'];
    }

  }

  async promiseForChart() {
    let years: any = await this.dashboardService.getTicketCreatedYears();
    this.createdYears = years['Data'];
    this.monthsNumber = await this.dashboardService.getTicketCreatedDatesMonthNumber(this.year);
    this.ticketCreatedMonthCount = await this.dashboardService.getTicketCreatedDatesCountPerMonth(this.year);
    this.assignData(this.monthsNumber['Data'], this.ticketCreatedMonthCount['Data']);
  }


  // This method gets all the categories 
  getCategories() {
    this.categoriesService.getCategoriesList().subscribe((categories: Icategories) => {
      this.categories = categories['Data'];
      this.defaultCat = this.idCt = this.categories[1].category_id_pk;
    });
  }

  getStatusList() {
    this.ticketService.getStatus().subscribe((status: Istatus) => {
      this.status = status['Data'];
      this.defaultStat = this.idSt = this.status[1].status_id_pk;
    });
  }

  // Getter for the technicians
  getTechnicians() {
    this.userService.getTechnicians().subscribe((technicians: Itechnicians) => {
      this.technicians = technicians['Data'];
      this.defaultTech = this.idTc =this.technicians[1].user_id_pk;
    })
  }

  getCurrentYearSelected(change: MatSelectChange) {
    this.year = change.value;
    this.promiseForChart();
  }

  getTechCount() {
    this.homeService.getTechniciansCount().subscribe(res => {
      this.techCount = res['Data'];
    });
  }

  getClientCount() {
    this.homeService.getClientCount().subscribe(res => {
      this.clientCount = res['Data'];
    });
  }

  getCategoriesCount() {
    this.homeService.getCategoriesCount().subscribe(res => {
      this.catCount = res['Data'];
    });
  }

  getRoleCount() {
    this.homeService.getRoleCount().subscribe(res => {
      this.roleCount = res['Data'];
    });
  }

  getTicketCount() {
    this.homeService.getTicketCount().subscribe(res => {
      this.ticketCount = res['Data'];
    });
  }

  getTechnicianMaxClosed() {
    this.ticketService.getTechnicianMaxClosedTickets().subscribe((id: any) => {
      this.technicianMaxClosedId = id['Data'];
      this.getTechnicianMaxClosedData(this.technicianMaxClosedId);
    });
  }

  getTechnicianMaxOpened() {
    this.ticketService.getTechnicianMaxOpenedTickets().subscribe((id: any) => {
      this.technicianMaxOpenedId = id['Data'];
      this.getTechnicianMaxOpenedData(this.technicianMaxOpenedId);
    })
  }

  getTechnicianMaxClosedData(id: number) {
    this.selectByIdService.getUserById(id).subscribe((technician: Itechnicians) => {
      this.technicianMaxClosed = technician['Data'][0];
    });
  }

  getTechnicianMaxOpenedData(id: number) {
    this.selectByIdService.getUserById(id).subscribe((technician: Itechnicians) => {
      this.technicianMaxOpened = technician['Data'][0];
    });
  }

  getMaxOpenedCount() {
    this.ticketService.getMaxOpenedTicketCount().subscribe((count: any) => {
      this.technicianMaxOpenedCount = count['Data'][0];
    });
  }

  getMaxClosedCount() {
    this.ticketService.getMaxClosedTicketCount().subscribe((count: any) => {
      this.technicianMaxClosedCount = count['Data'][0];
    });
  }

  getCategoryMostTickets() {
    this.ticketService.getCategoryMostTickets().subscribe((id: any) => {
      this.categoryMostTicketsId = id['Data'];
      this.getCategory(this.categoryMostTicketsId);
    });
  }

  getCategory(id: number) {
    this.selectByIdService.getCategoryById(id).subscribe((cat: Icategories) => {
      this.categoryMostTickets = cat['Data'][0];
    });
  }

  getCategoryMostCount() {
    this.ticketService.getCountCategoryMostTickets().subscribe((count: number) => {
      this.categoriesMostTicketCount = count['Data'];
    });
  }

  getOpenedTicketCount() {
    this.ticketService.getOpenedTicketsCount().subscribe((count: any) => {
      this.openedTicketsCount = count['Data'];
    });
  }

  getClosedTicketsCount() {
    this.ticketService.getClosedTicketsCount().subscribe((count: any) => {
      this.closedTicketsCount = count['Data'];
    });
  }

  getActiveCatCount() {
    this.categoriesService.categoryActiveCount().subscribe((count: any) => {
      this.activeCatCount = count['Data'][0];
    });
  }

  getInactiveCatCount() {
    this.categoriesService.categoryInactiveCount().subscribe((count: any) => {
      this.inactiveCount = count['Data'][0];
    });
  }

}


// This method is used for comparing categories in the table 
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}