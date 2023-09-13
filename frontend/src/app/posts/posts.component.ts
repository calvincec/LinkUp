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

  color: string = 'red'
  stroke: string = this.color
  fill:string = this.color

  
  constructor(private api: ApiService, private router: Router) {
    this.api.AllPostsService().subscribe((res: any) => {
      // console.log(res);

      if (res && res.allPosts) {
        this.posts = res.allPosts;

        res.allPosts.forEach((element: any) => {
          //fetch the likes for the post
          //check if user is in likes
          //add a field, post is liked, use ngif to update stroke and fill
          //add eventlistener to unlike the comment
        });

        console.log(this.posts);
        
      } else {
        console.error('Invalid API response format');
      }
    });
  }


  navtoOnepost(postid: any){
    console.log("item", postid);
    try {
      localStorage.removeItem('postid')
    } catch (error) {    }
    localStorage.setItem('postid', postid)

    this.router.navigate(['onepost'])
  }
  
  

  
  
}




