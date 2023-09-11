import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private router: Router, private api:ApiService) {}
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }


  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('password', form.value.password);
    // console.log('Email', form.value.email);
    // console.log('name', form.value.username);
    if(form.valid){
      // console.log(form.value);
      
      //proceed to register
      this.api.RegisterService(this.form.value)
      .pipe(
        catchError((error) => {
          let problems = error.error.error
          // console.log(problems);

          if(problems){
            if (problems.includes('pattern')){
              this.alertMsg = "Invalid Credentials"
              setTimeout(() => {
                this.alertMsg=''
              }, 3000);

            }else{
              this.alertMsg = problems
              setTimeout(() => {
                this.alertMsg=''
              }, 3000);
              // console.log( error.error.error);
            }
          }
          else{
            problems = error.error;
          }
          console.clear()
          return throwError(problems);
        })
      )
      .subscribe(res=>{
        if((res as any).message){
          this.clr = 'green'
          this.alertMsg = (res as any).message
          // console.log(res as any);


          setTimeout(() => {
            this.alertMsg=''
            this.clr = 'red'
            form.reset()
            this.router.navigate(['/']);
          }, 3000);
        }else{
          this.alertMsg = 'Invalid Credentials'
        }

      })



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
          if(form.value.username==''){
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
