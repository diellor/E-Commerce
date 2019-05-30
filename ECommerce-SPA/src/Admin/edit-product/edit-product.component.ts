import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product:Product;
  private sub:any; //for reading id from url
  id:number;
  constructor(private productService:ProductService,private alertify:AlertifyService,private route:ActivatedRoute) { }
  @ViewChild('editForm') editForm:NgForm;

  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.product = data['product']; 
  })
  }
 
   
 
  updateProduct(){
    this.productService.updateProduct(this.product.productId,this.product).subscribe(next=>{
      this.alertify.success("Product updated");
      this.editForm.reset(this.product);
    },()=>{
      this.alertify.error("Failed to update");
    });
  }
}
