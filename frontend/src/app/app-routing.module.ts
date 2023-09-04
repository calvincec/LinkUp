import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { NewpostComponent } from './newpost/newpost.component';
import { OnepostComponent } from './onepost/onepost.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, //login
  {path: 'register', component: RegisterComponent},
  {path: 'posts', component: PostsComponent} ,      //posts
  // {path: '', component: NavbarComponent},
  {path: 'newpost', component: NewpostComponent}, //newpost
  {path: '', component: OnepostComponent}  //onepost
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
