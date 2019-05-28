import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  model:any ={};
  constructor(private authService:AuthService,private alertify:AlertifyService,private router:Router) { }

  ngOnInit() {
  }
  login(){
    this.authService.loginAdmin(this.model).subscribe(next=>{
      this.alertify.success("Logged in successfully");
    },error=>{
      this.alertify.error(error);
  
    },()=>{
      this.router.navigate(['/createProduct']);
    });
  }

}
