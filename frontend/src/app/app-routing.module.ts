import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { NewpostComponent } from './newpost/newpost.component';
import { OnepostComponent } from './onepost/onepost.component';
import { AccountprofileComponent } from './accountprofile/accountprofile.component';
import { ChangesComponent } from './changes/changes.component';

const routes: Routes = [
  {path: '', component: LoginComponent}, //login
  {path: 'register', component: RegisterComponent},
  {path: 'posts', component: PostsComponent} ,      //posts
  // {path: '', component: NavbarComponent},
  {path: 'newpost', component: NewpostComponent}, //newpost
  {path: 'onepost', component: OnepostComponent},  //onepost
  {path: 'accountprofile', component: AccountprofileComponent},  //accountprofile
  {path: 'change', component: ChangesComponent} //change
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
