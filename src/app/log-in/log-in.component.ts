import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LogInService } from './log-in.service';
import { Iusers } from '../users/users-and-technicians/users';
import { Router } from '@angular/router';
import { Iauth } from '../services/auth';
import { UsersService } from '../users/users.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  createUserForm: FormGroup;
  authenticated: any;

  str: string ="NotShow";

  constructor(
    private formBuilder: FormBuilder,
    private auht: AuthService,
    private log: LogInService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formInit().then(res => {

    });
  }

  formInit(): Promise<void> {

    this.createUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    return Promise.resolve();
  }
 
  async logIn(form: any) {
    let user: Iusers = {
      email: form.email,
      password: form.password
    }
    localStorage.setItem('AuthEmail', user.email);
    await this.log.login(user);
    await this.log.getRoleOfAuthenticated(user.email)
    await this.auht.isAuthenticated();;
    let auth: any = await this.log.getAuthenticated(user.email);
    if(this.auht.isAuthenticated()){
      this.router.navigate(['home']);
    }
  }

  createNewUser(form: any) {
    if (window.confirm("Did you enter the correct information")) {
      this.promiseCreate(form).then((newUser: Iauth) => {
     
         this.log.createUserLogin(newUser)
          //  this.str = "NotShow";
      });
    }
  }
  promiseCreate(user) : Promise<Iauth>{
    let newUser: Iauth = {
      Firstname: user.firstname,
      Lastname: user.lastname,
      Phone: user.phone,
      Email: user.email,
      Password: user.password
    }
    return Promise.resolve(newUser);
  }

 logOut() {
    this.log.logout();
  }
 
  myStrCtr() {
    if (this.str === "Show")
      this.str = "NotShow"
    else
      this.str = "Show"
    }

}