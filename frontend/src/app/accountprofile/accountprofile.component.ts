import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.css']
})
export class AccountprofileComponent {
  
  constructor(private router: Router, private api:ApiService){
    this.api.getTokendet().subscribe((res: any)=>{
      // console.log(res);
      if(res.userdet){
        // console.log(res.userdet.profilepic);
        this.bio = res.userdet.bio
        this.username = res.userdet.username
        this.email = res.userdet.email
        this.profilepic = res.userdet.profilepic
      }
    })
  }
  bio = ''
  email = ''
  profilepic = ''
  username = ''

  choice = 'followers'
  txtcolor = 'white'
  txtcolor1 = '#FF851B'
  txtcolor2 = this.txtcolor
  txtcolor3 = this.txtcolor
  followers(){
    this.choice = 'followers'
    this.txtcolor1 = '#FF851B'
    this.txtcolor2 = this.txtcolor
   this.txtcolor3 = this.txtcolor
    
  }
  following(){
    this.choice = 'following'
    this.txtcolor2 = '#FF851B'
    this.txtcolor1 = this.txtcolor
    this.txtcolor3 = this.txtcolor
  }
  peopleymk(){
    this.choice ='peopleymk'
    this.txtcolor3 = '#FF851B'
    this.txtcolor1 = this.txtcolor
    this.txtcolor2 = this.txtcolor
  }



}
