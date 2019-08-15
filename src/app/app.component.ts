import { Component, OnInit } from '@angular/core';
import { LogInService } from './log-in/log-in.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'IT-Ticket-Center';
  
  constructor(private loginService: LogInService, private auth: AuthService) { }

  ngOnInit() {
    this.authenticate();
  }

  authenticate() {
   let email = localStorage.getItem('AuthEmail');
   if(email !== null) {
    this.auth.authenticatedUser(email);
   }
  }

  loggedIn(): Boolean { 
    return this.loginService.loggedIn.valueOf();
  }

}
