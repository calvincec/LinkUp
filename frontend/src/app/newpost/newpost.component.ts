import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
// import { environment } from './../environments/environment';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  form!: FormGroup;
  
  constructor(private router: Router, private api:ApiService) {
    this.api.getTokendet().subscribe((res: any)=>{
      // console.log(res);
      if(res.userdet){
        // console.log(res.userdet.profilepic);
        this.profilepic = res.userdet.profilepic
      }
    })
  }
  ngOnInit() {
    this.form = new FormGroup({
      postwords: new FormControl(''),
      postpic: new FormControl(''),
    });
  }
  
  profilepic: any = ''
  image: string | ArrayBuffer | null = null; // Initialize image as null
  errormsg = ''
  errormsgdisp: string = 'none'
  errormsgcolor: string = '#FF851B'

  postpicurl: any = ''
  display = 'none'
  async pic(event: any) {
    this.display=''
    // Handle the file change event here
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // console.log('Selected file:', selectedFile);

      // changes beagn from here
      // ensure you replace any instance of [environment.cloud_name] with your clodinary cloud_name
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("upload_preset", "shopie")
      formData.append("cloud_name", environment.cloud_name)

      await fetch(`https://api.cloudinary.com/v1_1/${environment.cloud_name}/image/upload`, {
          method: "POST",
          body: formData
      }).then((res) => res.json()).then(res => this.postpicurl = res.url)

      
    }

    let profileurl2  = await this.postpicurl
      // console.log('picture url: ', profileurl2);
    // ends here
      
      
    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Update the image property with the data URL
      this.image = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
  }

  deletePic(){
    this.image = null
    // console.log(this.postpicurl);
    
    this.postpicurl = ''
    // console.log(this.postpicurl);
    this.display = 'none'
  }

  onSubmit(form: FormGroup){
    console.log("Valid?", form.valid);
    console.log("postwords: ", form.value.postwords);
    console.log('postpic: ', this.postpicurl);
    console.log('postpic: ', form.value.postpic);

    const postwords  = form.value.postwords
    const userid = localStorage.getItem('userid')
    const postdetails: any = {
      userid: userid,
      postwords: form.value.postwords,
      postpic: this.postpicurl
    }

    if(postwords!='' || this.postpicurl != ''){
        this.api.createNewPost(postdetails)
            .pipe(
              catchError((error) => {
                let problems = error.error.error
                if(problems){
                  console.log(problems);
                }
                else{
                  problems = error.error;
                  console.log(problems);
                }
                console.clear()
                return of({})
              })
            )
            .subscribe((res: any)=>{
              if(res.message){
                this.errormsg = res.message
                this.errormsgdisp = ''
                this.errormsgcolor = 'green'
                form.reset()
                setTimeout(() => {
                  this.errormsg = ''
                  this.errormsgdisp = 'none'
                  this.router.navigate(['posts']);
                }, 1000);
              }
              
            })

      
    }

    else{
      this.errormsg = 'Please type something'
      this.errormsgdisp = ''
      this.errormsgcolor = '#FF851B'
      setTimeout(() => {
        this.errormsg = ''
        this.errormsgdisp = 'none'
      }, 1000);
    }
   
  }
  back(){
    this.profilepic= ''
    this.image = null; // Initialize image as null
    this.errormsg = ''
    this.errormsgdisp = 'none'
    this.errormsgcolor = '#FF851B'
  
    this.postpicurl = ''
    this.display = 'none'
   
    this.router.navigate(['posts'])
  }

}
