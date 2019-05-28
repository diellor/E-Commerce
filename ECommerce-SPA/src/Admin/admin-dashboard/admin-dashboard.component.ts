import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  createMode = false;
  constructor(private productService:ProductService,private alertify:AlertifyService,private router:Router) { }
  data:any;
  ngOnInit() {
  }

  createToggle(){
    this.createMode = true;
  }

  cancelCreationMode(createMode:boolean){ //false prej fmijs
    this.createMode = createMode;
  }
  getProducts(){
    return this.productService.getProducts().subscribe(next=>{
      
      this.data = next;
    });
  }
}
