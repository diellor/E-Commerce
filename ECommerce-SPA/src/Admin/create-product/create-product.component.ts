import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  model:any = {};
  @Output() cancelProductCreation = new EventEmitter();
  constructor(private productService:ProductService,private alertify:AlertifyService) { }

  ngOnInit() {
  }

  createProduct(){
    this.productService.createProduct(this.model).subscribe(next=>{
      this.alertify.success("BONI");
    
     
    },error=>{
      this.alertify.success(error);
    })
  }

  goBack(){
    this.cancelProductCreation.emit(false);
  }

}
