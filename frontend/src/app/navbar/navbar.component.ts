import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}
  currentRoute = this.route.snapshot.url;
  defaultcolor = 'white'
  homeicon=this.defaultcolor
  addposticon=this.defaultcolor
  mypostsicon=this.defaultcolor
  logouticon=this.defaultcolor
  accounticon=this.defaultcolor
  
  ngOnInit(): void {
    // Access the current route path
    const currentRoute = this.route.snapshot.url.join('/'); // e.g., '/home'
    // console.log('Current route:', currentRoute);
    if(currentRoute=='posts'){
      this.homeicon='#FF851B' 
    }
    if(currentRoute=='newpost'){
      this.addposticon='#FF851B'
    }
    if(currentRoute=='onepost'){
      this.homeicon='#FF851B'
    }
    if(currentRoute=='accountprofile'){
      this.accounticon='#FF851B'
    }
  }
  postsnav(): void{
    this.router.navigate(['posts']);
  }
  newpostnav(){
    this.router.navigate(['newpost']);
  }
  onepostnav(){
    this.router.navigate(['onepost']);
  }
  accountpsofilenav(){
    this.router.navigate(['accountprofile']);
  }
  logoutnav(){
    localStorage.clear()
    this.router.navigate(['']);
    this.location.replaceState('');
    
  }
  
}
