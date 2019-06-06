import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AdminPanelComponent } from "./Admin/admin-panel/admin-panel.component";
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { ProductListResolver } from "./Resolvers/product-list.resolver";
import { EditProductComponent } from "./Admin/edit-product/edit-product.component";
import { ProductEditResolver } from "./Resolvers/product-edit.resolver";
import { PreventUnsavedChanges } from "./guards/prevent-unsaved-changes.guard";
import { ProductsDetailComponent } from "./products/products-detail/products-detail.component";
import { ProductDetailResolver } from "./Resolvers/product-detail.resolver";

export const appRoutes: Routes = [
    {path: '',component:HomeComponent},
    {path:'admin',component:AdminPanelComponent},
    
    {path:'AdminPanel',component:AdminDashboardComponent, resolve:{products:ProductListResolver}},
    {path:'product/edit/:id',component:EditProductComponent, resolve:{product:ProductEditResolver}, canDeactivate:[PreventUnsavedChanges]},
    {
        path:'',
        canActivate:[AuthGuard],
        runGuardsAndResolvers: 'always',
        children:[
            {path:'products',component:ProductListComponent, resolve:{products:ProductListResolver}},  
            {path:'products/:id',component:ProductsDetailComponent,resolve:{product:ProductDetailResolver}},
        ]
    },
    //WildCardRoute if not match redirectTo
    {path:"**",redirectTo:'',pathMatch:'full'}
] 