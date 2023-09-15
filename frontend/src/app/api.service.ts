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
interface postUserId{
  userid: string
  postid: string
}
interface commentUserId{
  userid: string
  commentid: string
}
interface followerUserId{
  userid: string
  followerid: string
}
interface userPostwords{
  userid: string
  postwords: any
  postpic: any
}
interface anyComments{
  postid: any
  commentbdy: string
  userid: string
  parentcomment: any
}
interface useridv{
  userid: any
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  
  token = localStorage.getItem('token')
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': `${this.token}` // Assuming the token is a Bearer token
  });
  // headers2 = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // })
  userid = localStorage.getItem('userid')

  LoginService(details: credentials){
    return this.http.post('http://localhost:4600/user/login', details)
  }

  RegisterService(details: credentials){
    return this.http.post('http://localhost:4600/user/register', details)
  }

  AllPostsService(){
    const userid = this.userid
    return this.http.get(`http://localhost:4600/post/all/${userid}`)
  }
  getOnePostService(postid: string, details: credentials){
    // console.log(details);
    const headers: any = this.headers
    // const headers2: any = this.headers2
    return this.http.put(`http://localhost:4600/post/one/${postid}`, details,  { headers })
  }

  getComments(pcid: any){
    return this.http.get(`http://localhost:4600/comment/pcid/${pcid}`)
  }

  getTokendet(): Observable<any>{
    const headers: any = this.headers
    
    return this.http.get('http://localhost:4600/user/tokencheck', { headers })
  }
  like(details: postUserId){
    const headers: any = this.headers
    return this.http.post('http://localhost:4600/post/like', details, { headers })
  }
  likeComment(details: commentUserId){
    const headers: any = this.headers
    return this.http.post('http://localhost:4600/comment/like', details, { headers })
  }
  createNewPost(details: userPostwords){
    const headers: any = this.headers
    return this.http.post('http://localhost:4600/post/new', details, { headers })
  }

  commentThePost(details: anyComments){
    const headers: any = this.headers
    return this.http.post('http://localhost:4600/comment/new', details, { headers })
  }
  commentTheComment(details: anyComments){
    const headers: any = this.headers
    return this.http.post('http://localhost:4600/comment/new', details, { headers })
  }
  peopleymk(){
    const headers: any = this.headers
    const userid: any = this.userid
    return this.http.get(`http://localhost:4600/user/peopleymk/${userid}`, { headers })
  }

  viewAllFollowers(userid: any){
    const headers: any = this.headers
    // const userid: any = this.userid

    return this.http.get(`http://localhost:4600/user/allfollowers/${userid}`, { headers })
  }

  viewAllUserFollowing(userid: any){
    const headers: any = this.headers
    // const userid: any = this.userid

    return this.http.get(`http://localhost:4600/user/following/${userid}`, { headers })
  }

  follow(details: followerUserId){
    const headers: any = this.headers
    return this.http.post(`http://localhost:4600/user/follow`, details, { headers })
  }
}
