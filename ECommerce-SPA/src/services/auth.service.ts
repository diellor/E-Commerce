import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn:'root'
})

export class AuthService{
    decodedToken:any;
    jwtHelper = new JwtHelperService();
    
    constructor(private http:HttpClient){}

    login(model: any){
        return this.http.post('http://localhost:5001/api-auth/login',model).pipe(
            map((response:any)=>{
                const user = response; //qetu user = tokenin qe na vjen 

                if(user){
                    localStorage.setItem('token',user.token);
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                }
            })
        );
    }

    loginAdmin(model: any){
        return this.http.post('http://localhost:5001/api-admin/login',model).pipe(
            map((response:any)=>{
                const user = response; //qetu user = tokenin qe na vjen 

                if(user){
                    localStorage.setItem('token',user.token);
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                }
            })
        );
    }

    register(model:any){
        return this.http.post('http://localhost:5001/api-auth/register',model);
    }

    loggedIn(){
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
    
}
