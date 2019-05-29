import { Injectable } from "@angular/core";
import { Product } from "src/models/product";
import { AuthService } from "src/services/auth.service";
import { AlertifyService } from "src/services/alertify.service";
import { ProductService } from "src/services/product.service";
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()

export class ProductListResolver implements Resolve<Product[]>{

    constructor(private productService:ProductService,private alertify:AlertifyService,private router:Router){

    }

    resolve(route:ActivatedRouteSnapshot):Observable<Product[]>{
        return this.productService.getProducts().pipe(
            catchError(error=>{
                this.alertify.error("Problem retrieving data");

                return of(null);
            })
        )
    }

}