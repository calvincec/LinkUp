import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

// used reactive forms like as explained in https://www.digitalocean.com/community/tutorials/angular-reactive-forms-introduction
// to correct imports errors, point on the error and import all the required

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  clr = 'red'
  form!: FormGroup;
  alertMsg = ''
  constructor(private router: Router) {}
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }


  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('password', form.value.password);
    console.log('Email', form.value.email);
    console.log('name', form.value.name);
    if(form.valid){
      //proceed to register
      this.clr = 'black'
      this.alertMsg = 'successfully registered'

      setTimeout(() => {
        this.alertMsg = '';
        this.clr = 'red'
        this.router.navigate(['']);
        
      }, 2000);
      
    
      form.reset()
    }else{
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
          if(form.value.name==''){
            this.alertMsg = 'Please your full names'
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
    
    }
  }


  signup(){
    this.router.navigate(['']);
  }
}
