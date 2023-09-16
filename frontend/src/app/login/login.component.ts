import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
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



  constructor(private router: Router, private api:ApiService) {}
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }



  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('password', form.value.password);
    // console.log('Email', form.value.email);
    if(form.valid){
      //proceed to posts
      // console.log('form value', this.form.value);

      console.log(this.form.value);
      
      this.api.LoginService(this.form.value)
      .pipe(
        catchError((error) => {
          let problems = error.error.error
          // console.log(problems);

          if(problems){
            if (problems.includes('pattern')){
              // console.log("Invalid Credentials");
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
          return of({});
        })
      )
      .subscribe(res=>{
        if((res as any).message){
          this.clr = 'green'
          this.alertMsg = (res as any).message
          const token  = (res as any).token
          // console.log(token);
          localStorage.clear()
          localStorage.setItem('token', token)


          

          this.api.getTokendet()
          .pipe(
            catchError((error) => {
              let problems = error.error.Error
              return of({})
              // return throwError(error);
            })
          )

          .subscribe((res: any)=>{
            console.log(res);
              if(res.userdet){
                console.log(res.userdet.userid);
                localStorage.setItem('userid', res.userdet.userid)

                setTimeout(() => {
                  this.alertMsg=''
                  this.clr = 'red'
                  form.reset()
                  this.router.navigate(['/posts']);
                }, 3000);
                }
            
          })

          this.alertMsg=''
          this.clr = 'red'
          form.reset()
          

        }else{
          this.alertMsg = 'Invalid Credentials'
        }

      })

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







