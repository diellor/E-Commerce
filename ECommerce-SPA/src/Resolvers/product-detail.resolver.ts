import {Injectable} from '@angular/core';

import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/models/product';

@Injectable()
export class ProductDetailResolver implements Resolve<Product>{
    //With this resolver now we will get data from our Route not the member-detail onInit method 
    constructor(private productService:ProductService,private router:Router,private alertify:AlertifyService){}

    //we need to implement resolve method
    resolve(route:ActivatedRouteSnapshot):Observable<Product>{
        //we get the id from route parameter
        //when we use resolve this automaticlly subscribes to the method
        //but we need to catch errors and return the user back so we use pipe()
        return this.productService.getProduct(route.params['id']).pipe(
            //all this is for catching the error
            catchError(error=>{
                this.alertify.error("Problem retrieving data");
                this.router.navigate(['/home']);
                //we return observable of null if theres problem
                return of(null);
            })
        )
    }
}