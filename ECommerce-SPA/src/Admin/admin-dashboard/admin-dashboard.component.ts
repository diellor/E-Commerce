import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  products:Product[];
  createMode = false;
  editMode = false;
  constructor(private productService:ProductService,private alertify:AlertifyService,private router:Router,private route:ActivatedRoute) { }

 // data:any;
  
  ngOnInit() {
    this.route.data.subscribe(data=>{
        this.products = data['products']; 
    })
  }

  createToggle(){
    //this.router.navigate(['product/edit',product]);
    this.createMode=true;
  }

  cancelCreationMode(createMode:boolean){ //false prej fmijs
    this.createMode = createMode;
  }
  updateList(product:Product){
    this.products.push(product);
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(()=>{
      this.alertify.success("Product has been deleted");

      //qetu e fshin prej array'it t produkteve(listes) qe e kena
      this.products.splice(this.products.findIndex(p=>id ===id),1);

    },error=>{
      this.alertify.error("Failed to delete");
    });
  }
  editToggle(id:number){
    this.productService.setProductId(id);
    this.router.navigate(['product/edit',id]);
    
  }
  
  
}
