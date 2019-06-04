import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  userTechnician = {
    user_id_pk: 1,
    firstname: "Hilmaris",
    lastname: "Sepulveda",
    email: "hilma@noobnet.com",
    phone: "7873332323",
    role_type_fk: 1
  }

}
