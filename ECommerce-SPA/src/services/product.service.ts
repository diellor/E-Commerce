import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { Product } from "src/models/product";

@Injectable({
    providedIn:'root'
})

export class ProductService{

    constructor(private http:HttpClient){}
    Id:number;

    createProduct(model:any){
        return this.http.post('http://localhost:5001/api-admin/createProduct',model);
    }

    getProducts():Observable<Product[]>{
        return this.http.get<Product[]>('http://localhost:5001/api-admin/products');
    }
    getProduct(id):Observable<Product>{
        return this.http.get<Product>("http://localhost:5001/api-admin/product/"+id);
    }

    deleteProduct(productId:number){
        return this.http.delete("http://localhost:5001/api-admin/products/delete/"+productId);
    }

    updateProduct(productId:number,product:Product){
        return this.http.put("http://localhost:5001/api-admin/products/update/"+productId,product);
    }
    setMainPhoto(productId:number,id:number){
        return this.http.post("http://localhost:5001/api-admin/products/"+productId+"/photos/"+id+"/setMain",{});
    }
    
    setProductId(id:number){
        this.Id = id;
    }
    
}
