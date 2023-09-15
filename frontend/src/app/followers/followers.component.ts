import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit{
  constructor(private api:ApiService){ }
  
  ngOnInit(): void {
    const userid = localStorage.getItem('userid')
    this.api.viewAllFollowers(userid).subscribe((res: any)=>{
      console.log(res);
      if(res.followers){
        this.followers = res.followers
        console.log(this.followers);
        
      }
      
    })
  }
  followers: any = ''
}
