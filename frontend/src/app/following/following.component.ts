import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit{
  constructor(private api:ApiService){ }

  ngOnInit(): void {
    const userid = localStorage.getItem('userid')
    this.api.viewAllUserFollowing(userid).subscribe((res: any)=>{
      console.log(res);
      if(res.following){
        this.following = res.following
        console.log(this.following);
      }
    })
  }



  following: any = ''
}
