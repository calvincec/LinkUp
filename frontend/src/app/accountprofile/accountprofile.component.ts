import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.css']
})
export class AccountprofileComponent implements OnInit{
  constructor(private router: Router, private api:ApiService){ 
    this.api.getTokendet().subscribe((res: any)=>{
      // console.log(res);
      if(res.userdet){
        // console.log(res.userdet.profilepic);
        this.bio = res.userdet.bio
        this.username = res.userdet.username
        this.email = res.userdet.email
        this.profilepic = res.userdet.profilepic
      }
    })
    
  }

  

  ngOnInit () {
    this.form = new FormGroup({
      username: new FormControl("",Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      bio: new FormControl(''),
      profilepic: new FormControl(''),
    });
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

  display = ''
  

  onSubmit(form: FormGroup) {
    console.log('email', this.form.value.email);
    
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
    //this function enables one update the profile
    //finish this function so that when called (the button is clicked), it replaces the values of the input form with the values from bio, username and email variables
    //assume the submit form function is present and working well
    //this function only replaces the blanks in the form with the values set at the constructor, except the profile picture

    const currentValues = this.form.value;

  // Update the form controls only if they are not already set
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


}
