import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-peopleymk',
  templateUrl: './peopleymk.component.html',
  styleUrls: ['./peopleymk.component.css']
})
export class PeopleymkComponent implements OnInit{
  constructor(private api:ApiService){
    
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    const userid = localStorage.getItem('userid')
    this.api.peopleymk(userid)
    .subscribe((res: any)=>{
      // console.log(res);
      
      if(res.peopleymk){
        this.peopleymk = res.peopleymk
      }
      console.log(this.peopleymk);
      
    })
  }


  async follow(id: any){
    console.log(id);
    const curuser = localStorage.getItem('userid')
    const details: any = {
      userid: id,
      followerid: curuser
    }
    await this.api.follow(details).subscribe((res: any)=>{
      console.log(res);
      this.ngOnInit()
    })
    
  }
  peopleymk: any = []
}
