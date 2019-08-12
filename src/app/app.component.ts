import { Component, OnInit } from '@angular/core';
import { LogInService } from './log-in/log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'IT-Ticket-Center';
  
  constructor(private loginService: LogInService) { }

  ngOnInit() {

  }


  loggedIn(): Boolean { 
    return this.loginService.loggedIn.valueOf();
  }

}
