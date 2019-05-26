import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}; //empty object that will store our username and password

  constructor(public authService:AuthService,private router:Router,private alertify:AlertifyService) { }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.model).subscribe(next=>{
      this.alertify.success("Logged in successfully");
    },error=>{
      this.alertify.error(error);
    },()=>{
      this.router.navigate(['/products']);
    });
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logOut(){
    localStorage.removeItem('token');
    this.authService.decodedToken = null;

    this.alertify.message("logged out");
    this.router.navigate(['/home']);
  }
}
