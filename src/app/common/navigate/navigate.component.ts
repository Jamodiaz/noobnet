import { Component, OnInit, Input } from '@angular/core';
import { Inav } from './navigate';
import { MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  @Input() navigate: Inav[];

  navigationRoute: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  selected(change: MatSelectChange): Promise<string> {
    this.navigationRoute = change.value;
    console.log(this.navigationRoute)
    return Promise.resolve(this.navigationRoute)
  }

  onClick() {
    this.router.navigate(["/" + this.navigationRoute]);
  }

}
