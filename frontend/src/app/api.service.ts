import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

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

  
  token = localStorage.getItem('token')
  headers = new HttpHeaders({
    'token': `${this.token}` // Assuming the token is a Bearer token
  });

  LoginService(details: credentials){
    return this.http.post('http://localhost:4600/user/login', details)
  }

  RegisterService(details: credentials){
    return this.http.post('http://localhost:4600/user/register', details)
  }

  AllPostsService(){
    return this.http.get('http://localhost:4600/post/all')
  }
  getOnePostService(postid: string){
    return this.http.get(`http://localhost:4600/post/one/${postid}`)
  }

  getComments(pcid: any){
    return this.http.get(`http://localhost:4600/comment/pcid/${pcid}`)
  }

  getTokendet(): Observable<any>{
    const headers: any = this.headers
    
    return this.http.get('http://localhost:4600/user/tokencheck', { headers })
  }
}
