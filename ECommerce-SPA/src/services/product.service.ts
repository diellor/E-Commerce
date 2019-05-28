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

    createProduct(model:any){
        return this.http.post('http://localhost:5001/api-admin/createProduct',model);
    }

    getProducts():Observable<Product[]>{
        return this.http.get<Product[]>('http://localhost:5001/api-admin/products');
    }
    
}
