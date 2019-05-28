import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AdminPanelComponent } from "./Admin/admin-panel/admin-panel.component";
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";

export const appRoutes: Routes = [
    {path: '',component:HomeComponent},
    {path:'admin',component:AdminPanelComponent},
    {path:'AdminPanel',component:AdminDashboardComponent},
    {
        path:'',
        canActivate:[AuthGuard],
        runGuardsAndResolvers: 'always',
        children:[
            {path:'products',component:ProductListComponent},  
        ]
    },
    //WildCardRoute if not match redirectTo
    {path:"**",redirectTo:'',pathMatch:'full'}
] 