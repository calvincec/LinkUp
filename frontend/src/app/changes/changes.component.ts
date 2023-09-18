import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {

  constructor(private router: Router,  private api:ApiService) {}

  codeform!: FormGroup;
  emailform!: FormGroup;
  passform!: FormGroup;
  email = ''
  ngOnInit() {
    this.codeform = new FormGroup({
      code: new FormControl('', Validators.required)
    });
    this.emailform = new FormGroup({
      email: new FormControl('', Validators.required)
    })
    this.passform = new FormGroup({
      password: new FormControl('', Validators.required),
      cpasword: new FormControl('', Validators.required)
    })
  }
  emaildisplay = 'none'
  emaildisplay2 = ''
  changepwddisplay = 'none'

  token = localStorage.getItem('token')
  errorMsg = ''
  color = 'red'
  resetcode = ''

  onSubmitEmail(form: FormGroup){
    if(form.valid){
      this.api.checkEmail(form.value.email)
      .pipe(
        catchError((error) => {
          let problems = error.error.error
          console.log(problems);

          if(problems){
              this.errorMsg = problems
              form.reset()
              setTimeout(() => {
                this.errorMsg=''
              }, 3000);
              // console.log( error.error.error);
            
          }
          else{
            problems = error.error;
          }
          // console.clear()
          return of({});
        })
      )
      .subscribe((res: any)=>{
        if(res){
          if(res.message){
            console.log(res.message);
            console.log(form.value.email);
            this.email = form.value.email
            

            this.emaildisplay = ''
            this.emaildisplay2 = 'none'
            this.changepwddisplay = 'none'
            this.api.sendEmailAndgetCode(this.email).subscribe((res: any)=>{
              if(res.code){
                this.resetcode = res.code
              }

            })

            // send the email with code
          }
        }
        
        
      })

    }
    else{
        this.errorMsg = "Please enter a valid email"
        setTimeout(() => {
          this.errorMsg = '';
          form.reset()
        }, 2000);
    }
  }

  onSubmitCode = async(form: FormGroup, email: any)=>{
    console.log(email);
    
    if(form.valid){
      console.log(form.value.code);
      const usercode = form.value.code
      this.errorMsg = 'Kindly wait as we process your code'
      this.color = 'green'
      if(this.resetcode!=usercode){

        this.errorMsg = 'The code is wrong, let us resend another code'
        this.color = 'red'
        setTimeout(() => {
          this.errorMsg = ''
          form.reset()
          this.emaildisplay2 = ''
          this.emaildisplay = 'none'
          this.changepwddisplay = 'none'
        }, 1000);
      }else{
        form.reset()
        this.errorMsg = ''
        this.emaildisplay2 = 'none'
        this.emaildisplay = 'none'
        this.changepwddisplay = ''
        
      }
    }

  }

  onSubmitPass(form: FormGroup){

    if(form.valid){
      const newpwd = form.value.password
      const confirmpwd = form.value.cpasword
      if(newpwd==confirmpwd){
        // console.log('proceed to reset password');
        const pwd = {
          password: confirmpwd
        }
        this.api.changepws(this.email, pwd).subscribe((res: any)=>{
          console.log(res);
          if(res.message){
            this.errorMsg = 'Password changed successfully'
            this.color = 'green'
            form.reset()
            setTimeout(() => {
              this.errorMsg = ''
              this.color = 'red'
              this.router.navigate(['/'])
            }, 1000);
          }
          
        })
        

      }else{
        this.errorMsg = 'The password must match'
        this.color = 'red'
        setTimeout(() => {
          this.errorMsg = ''
        }, 1000);
      }

    }else{
      this.errorMsg = 'kindly input all the required entries'
      this.color = 'red'

      setTimeout(() => {
        this.errorMsg = ''
      }, 1000);
    }
  }
  quit(form: FormGroup){
    form.reset()
    this.router.navigate(['/'])
  }

}
