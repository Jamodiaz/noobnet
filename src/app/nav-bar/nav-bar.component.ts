import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authenticatedRole: string = localStorage.getItem("Role");

  constructor() { }

  ngOnInit() {
    console.log( localStorage.getItem("Role"));
  }

}
