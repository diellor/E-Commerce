import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {  HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';


import { AppComponent } from './app.component';
import { NavComponent } from '../nav/nav.component';
import { HomeComponent } from '../home/home.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { RegisterComponent } from '../register/register.component';
import {AdminPanelComponent} from'../Admin/admin-panel/admin-panel.component'

import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { ErrorInterceptorProvider } from 'src/services/error.interceptor';
import { from } from 'rxjs';





@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      
      ProductListComponent,
      AdminPanelComponent 
  
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
   ],
   providers: [
      AuthService,
      AlertifyService,

      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
