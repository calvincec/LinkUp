import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-onepost',
  templateUrl: './onepost.component.html',
  styleUrls: ['./onepost.component.css']
})
export class OnepostComponent {

  constructor(private route: ActivatedRoute, private api: ApiService) {
    
  }
  //the two will be used hide or unhide comments and sub comments divs resp if no comment below
  commentDisplay = ''
  comment2Display = "" //dynamically replaced with none

  //postdetails
  postid: any = localStorage.getItem('postid')
 

  // commentdetails, where subcomments will be appended to each comment as (innercomments) array
  allcomments : any = []
  onepost : any = {}



  ngOnInit() {
   
      //get details for one post
      this.api.getOnePostService(this.postid).subscribe((one: any)=>{
        const onepost = one.onePost[0]
        this.onepost = onepost
        // console.log(onepost.likes);
        
      })

      //Get comments related to this post
      this.api.getComments(this.postid).subscribe((res: any) => {
        if (res && res.comments) {
          if(res.comments.lenght != 0){
            this.commentDisplay = ''
            this.allcomments = res.comments

            //for each comment, get subcomments and append them to the comment object
            this.allcomments.forEach((element: any) => {
              const id: string = element.commentid
              this.api.getComments(id).subscribe((val: any)=>{
                if(val && val.comments){
                  if(val.comments.lenght !=0){
                    this.comment2Display = ''
                    element.innercomments = val.comments
                    // console.log(val.comments);
                    // console.log(element);
                  }
                  
                }
                else{
                  this.comment2Display = 'none'
                  console.log("no comment");
                }
              })

            });

          }
          else{
            this.commentDisplay = 'none'
            console.log("no comment"); 
          }
          
        } else {
          console.error('Invalid API response format');
        }
      });
      
      
  }

  
}
