import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Router } from '@angular/router';
import { Product } from 'src/models/product';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  model:any = {};
  product:Product;
  @Output() cancelProductCreation = new EventEmitter();
  @Output() addedProduct = new EventEmitter<Product>();
  photoUploadMode = false;
  constructor(private productService:ProductService,private alertify:AlertifyService,private router:Router) { }

  ngOnInit() {
  }

  createProduct(){
    this.productService.createProduct(this.model).subscribe(next=>{
      this.alertify.success("BONI");
      this.product = this.model;
      this.product.productId = parseInt(JSON.stringify(next));
      this.productService.setProductId(this.product.productId);

      this.photoUploadMode = true;
      
      
      
    },error=>{
      this.alertify.success(error);
    })
  }

  goBack(){
    this.cancelProductCreation.emit(false);
    if(this.product){
      this.addedProduct.emit(this.product);
    }
    
  }



}
