import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { ApiService } from '../api.service';
// import { ApiService } from '../api.service';

// used reactive forms like as explained in https://www.digitalocean.com/community/tutorials/angular-reactive-forms-introduction
// to correct imports errors, point on the error and import all the required

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  clr = 'red'
  form!: FormGroup;
  alertMsg = ''

  constructor(private router: Router) {}
    
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }


  
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('password', form.value.password);
    console.log('Email', form.value.email);
    if(form.valid){
      //proceed to posts
      this.clr = 'black'
      this.alertMsg = 'Logged in successfully'

      setTimeout(() => {
        this.alertMsg = ''
        this.clr = 'red'
        this.router.navigate(['/posts']);
      }, 2000);
      
    
      form.reset()
    }
    else{
      if(form.value.password==''){
        this.alertMsg = 'Please enter your password'
        setTimeout(() => {
          this.alertMsg=''
        }, 2000);
      }else{
        if(form.value.email==''){
          this.alertMsg = 'Please enter the email'
          setTimeout(() => {
            this.alertMsg=''
          }, 2000);
        }else{

          this.alertMsg = 'Kindly input a valid email'
          setTimeout(() => {
            this.alertMsg=''
          }, 2000);
        }
      }
    }
    //
  }
  signup(){
    this.router.navigate(['/register']);
  }
}
