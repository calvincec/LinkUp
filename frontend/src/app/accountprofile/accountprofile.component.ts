import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.css']
})
export class AccountprofileComponent implements OnInit{
  constructor(private router: Router, private api:ApiService){ 
    this.form = new FormGroup({
      username: new FormControl("",Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      bio: new FormControl(''),
      profilepic: new FormControl(''),
    });
    
  }
  
  
  
  ngOnInit () {
    this.render()
  }

  render(){
    const userid = localStorage.getItem('userid')
    this.api.getOneuser(userid).subscribe((res: any)=>{
      console.log(res);
      if(res.userdet){
        // console.log(res.userdet.profilepic);
        this.bio = res.userdet.bio
        this.username = res.userdet.username
        this.email = res.userdet.email
        this.profilepic = res.userdet.profilepic
        // console.log(res.userdet);
        this.currentProfilePic = this.profilepic
        this.profilepicurl = this.profilepic
        
      }
    })
    
  }
  clr = 'red'
  form!: FormGroup;
  alertMsg = ''


  bio = ''
  email = ''
  profilepic = ''
  username = ''
  choice = 'followers'
  updatedisp='none'
  txtcolor = 'white'
  txtcolor1 = '#FF851B'
  txtcolor2 = this.txtcolor
  txtcolor3 = this.txtcolor
  alertMsgClr = 'red'

  display = ''

  currentProfilePic: string = this.profilepic;
  profilepicurl: string = ''
  

  onSubmit(form: FormGroup) {
    console.log('valid', form.valid);
    // console.log("form: ", form.value);
    // console.log('url to be sent', this.profilepicurl);

    if(form.valid){
      const updateDetails: any={
        username: form.value.username,
        email: form.value.email,
        profilepic: this.profilepicurl,
        bio: form.value.bio,
      }
      const userid: any = localStorage.getItem('userid')
      this.api.updateUser(updateDetails, userid)
      .subscribe((res: any)=>{
        console.log(res);
        if(res.message){
          this.alertMsgClr = 'green'
          this.bio = form.value.bio
          this.email = form.value.email
          this.profilepic = this.profilepicurl
          this.username = form.value.username
          this.alertMsg = 'Details updated successfully'
          setTimeout(() => {
            this.alertMsg = ''
            this.alertMsgClr = 'red'
            form.reset()
            this.updatedisp='none'
            this.display=''
            // this.render()
            // this.router.navigate(['accountprofile'])

          }, 2000);
        }
        
      })



    }
    else{
      if(form.value.username==''){
        console.log('your name is required');
        this.alertMsg = 'your name is required'
      }else
      if(form.value.email==''){
        console.log("email is required");
        this.alertMsg = "email is required"
        
      }else{
        console.log("ensure the email is correct");
        this.alertMsg = "ensure the email is correct"
      }

    }
    setTimeout(() => {
        this.alertMsg = ''
        this.alertMsgClr = 'red'
      }, 2000);

  }


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

  updatebio(){
    this.updatedisp=''
    this.display='none'
    const currentValues = this.form.value;
  
    if (!currentValues.username) {
      this.form.patchValue({ username: this.username });
    }
    if (!currentValues.email) {
      this.form.patchValue({ email: this.email });
    }
    if (!currentValues.bio) {
      this.form.patchValue({ bio: this.bio });
    }
    
  }

  


  async onProfilePicChange(event: any) {

    const file = event.target.files[0];
    if (file) {
      // Read the selected file as a data URL and set it as the current profile picture
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentProfilePic = e.target.result as string;
      };
      reader.readAsDataURL(file);

      //convert using cloudinary
      // ensure you replace any instance of [environment.cloud_name] with your cloudinary cloud_name
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "shopie")
      formData.append("cloud_name", environment.cloud_name)

      await fetch(`https://api.cloudinary.com/v1_1/${environment.cloud_name}/image/upload`, {
          method: "POST",
          body: formData
      }).then((res) => res.json()).then(res => this.profilepicurl = res.url)
      
    }
  }

}


