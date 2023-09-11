import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts = {}
  constructor(private api:ApiService){
    this.api.AllPostsService().subscribe(res=>{
			console.log(res)
      this.posts = res
      console.log(this.posts);
      
		})

    // console.log(this.posts);
    
	}

  getallposts(){
    
  }


}

