import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-onepost',
  templateUrl: './onepost.component.html',
  styleUrls: ['./onepost.component.css']
})
export class OnepostComponent implements OnInit{

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  //the two will be used hide or unhide comments and sub comments divs resp if no comment below
  commentDisplay = ''
  comment2Display = "" //dynamically replaced with none
  // nullthing: any = ""
  
  //postdetails
  postid: any = localStorage.getItem('postid')
  form!: FormGroup;

  // commentdetails, where subcomments will be appended to each comment as (innercomments) array
  allcomments : any = []
  onepost : any = {}

  likefill = 'none'  //#FF851B
  stroke = 'white'


  ngOnInit() {
   
    this.form = new FormGroup({
      words: new FormControl('', [Validators.required])
    });

 
      //get details for one post
      const userid = localStorage.getItem('userid')
      // console.log(userid);
      const entity: any = {
        userid: userid
      }
      this.api.getOnePostService(this.postid, entity).subscribe((one: any)=>{
        const onepost = one.onePost[0]
        
        // console.log(onepost);
        
        // console.log(onepost.curuserliked);
        if(onepost.curuserliked!=null){
          this.likefill = '#FF851B'
          this.stroke = '#FF851B'
        }
        
        this.onepost = onepost
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
        console.log(this.allcomments);
      });
      
      
      
  }

  onSubmit(form: FormGroup, details: any){
    
    if(form.valid){
      const userid = localStorage.getItem('userid')
      // console.log(this.form.value);
      // console.log(details);
      console.log(userid);

      
      if(details.commentid){
        // console.log("details: ", details);
        
        const comment: any = {
          parentcomment: details.commentid,
          userid: userid,
          commentbdy: this.form.value.words,
          postid: null
        }
        // console.log(comment);

        console.log('comment the comment');
        this.api.commentTheComment(comment).subscribe((res: any)=>{
          // console.log(res);
          if(res.message){
            if(res.message=='Comment added successfully'){
              form.reset()
              this.ngOnInit()
              
            }
          }
        })
      }
      else if(details.postid){
        const comment: any = {
          postid: details.postid,
          userid: userid,
          commentbdy: this.form.value.words,
          parentcomment: null
        }

        console.log(comment);
        
        console.log('comment the post');
        this.api.commentThePost(comment).subscribe((res: any)=>{
          console.log(res);
          if(res.message){
            if(res.message=='Comment added successfully'){
              form.reset()
              this.ngOnInit()
              
            }
          }
        })
      }
      
      
      
    }
  }


  likeunlike(postid: string, index: any){
    console.log(postid);
    console.log(index);
    
    const userid = localStorage.getItem('userid')
    const obj: any = {
      userid : userid,
      commentid: postid
    }
    this.api.likeComment(obj).subscribe((res: any)=>{
      console.log(res.likeid);
      
      if(res.likeid){
        if(res.likeid.length!=0){
          console.log(res.likeid.length);
          // this.posts[index].fillColor = '#FF851B'
          // this.posts[index].likes++
        }
        else{
          // console.log(res.likeid.length);
          
          // this.posts[index].fillColor = ''
          // this.posts[index].likes--
        }
      }



    })
    
    
  }
}
