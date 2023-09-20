import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.interface';
import {OnepostComponent} from '../onepost/onepost.component'
import { Router } from '@angular/router';


OnepostComponent
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[] = [];

  color: string = '#FF851B'
  stroke: string = ''
  fill:string = this.color

  
  constructor(private api: ApiService, private router: Router) {
    this.setposts()
  }
 

  setposts(){
    const userid = localStorage.getItem('userid')
    this.api.AllPostsService(userid).subscribe((res: any) => {
      // console.log(res);

      if (res && res.allPosts) {
        

        let index = 0
        res.allPosts.forEach((element: any) => {
          // console.log(element);


          element.fillColor = '';
          // console.log(element.curuserliked);
          if(element.curuserliked!=null){
            element.fillColor = '#FF851B'
          }
          
          element.index = index
          index++
        });
        this.posts = res.allPosts;
        // console.log(this.posts);
        
      } else {
        console.warn('Invalid API response format');
      }
    });
  }

  likeunlike(postid: string, index: any){
    console.log(postid);
    const userid = localStorage.getItem('userid')
    const obj: any = {
      userid : userid,
      postid: postid
    }

    console.log(obj);
    
    this.api.like(obj).subscribe((res: any)=>{
      console.log(res);
      
      if(res.likeid){
        if(res.likeid.length!=0){
          console.log(res.likeid.length);
          this.posts[index].fillColor = '#FF851B'
          this.posts[index].likes++
        }
        else{
          // console.log(res.likeid.length);
          
          this.posts[index].fillColor = ''
          this.posts[index].likes--
        }
      }
    })
 
  }

 

  navtoOnepost(postid: any){
    // console.log("item", postid);
    try {
      localStorage.removeItem('postid')
    } catch (error) {    }
    localStorage.setItem('postid', postid)

    this.router.navigate(['onepost'])
  }
  
  userid = localStorage.getItem('userid')
  deletepost(postid: any){
    console.log(postid);
    this.api.deletePost(postid).subscribe((res: any)=>{
      console.log(res);
      if(res.message) {
        this.setposts()
      }
    })
    
      
  }

  
  
}




