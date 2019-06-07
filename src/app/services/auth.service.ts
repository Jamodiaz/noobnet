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

  userClient = {
    user_id_pk: 11,
    firstname: "Paola",
    lastname: "Contreras",
    email: "paolita@noobnet.com",
    phone: "7879998877",
    role_type_fk: 2
  }

}
