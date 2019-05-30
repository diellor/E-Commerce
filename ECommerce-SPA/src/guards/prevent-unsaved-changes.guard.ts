import { Injectable } from "@angular/core";

import { CanDeactivate } from "@angular/router";
import { EditProductComponent } from "src/Admin/edit-product/edit-product.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditProductComponent>{
    //we need access to the form inside membereditComponent so we pass as parameter
    canDeactivate(component:EditProductComponent){
        if(component.editForm.dirty){
            //If form is changed we will alert the user if he click OK he will navigate where he wanted to
            return confirm("Are you sure you want to continue ? Any unsaved changes will be lost");
        }
        //if form is not dirty we will let him continue anyway so we return true
        return true;
    }
}