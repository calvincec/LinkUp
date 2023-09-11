import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface credentials {
  email: string
  password :string
}
interface regcredentials {
  username: string
  email: string
  password :string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  LoginService(details: credentials){
    return this.http.post('http://localhost:4600/user/login', details)
  }

  RegisterService(details: credentials){
    return this.http.post('http://localhost:4600/user/register', details)
  }
}
