import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {  HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';



import { appRoutes } from '../routes';


import { AppComponent } from './app.component';
import { NavComponent } from '../nav/nav.component';
import { HomeComponent } from '../home/home.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { RegisterComponent } from '../register/register.component';
import {AdminPanelComponent} from'../Admin/admin-panel/admin-panel.component';
import {CreateProductComponent} from'../Admin/create-product/create-product.component';
import {AdminDashboardComponent} from'../Admin/admin-dashboard/admin-dashboard.component';
import { ProductsCardComponent } from 'src/products/products-card/products-card.component';


import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { ErrorInterceptorProvider } from 'src/services/error.interceptor';
import { from } from 'rxjs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductListResolver } from 'src/Resolvers/product-list.resolver';
import { ProductEditResolver } from 'src/Resolvers/product-edit.resolver';

import { EditProductComponent } from 'src/Admin/edit-product/edit-product.component';
import { PreventUnsavedChanges } from 'src/guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from 'src/Admin/photo-editor/photo-editor.component';
import { ProductsDetailComponent } from 'src/products/products-detail/products-detail.component';
import { ProductDetailResolver } from 'src/Resolvers/product-detail.resolver';







@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      
      ProductListComponent,
      AdminPanelComponent,
      CreateProductComponent,
      AdminDashboardComponent,
      EditProductComponent,
      PhotoEditorComponent,
      ProductsCardComponent,
      ProductsDetailComponent
      
  
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      FileUploadModule,
      NgxGalleryModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      ProductListResolver,
      ProductEditResolver,
      PreventUnsavedChanges,
      ErrorInterceptorProvider,
      ProductDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
