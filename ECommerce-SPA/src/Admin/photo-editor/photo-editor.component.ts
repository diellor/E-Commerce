import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/models/product';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

 
  @Input() photos: Photo[] = new Array();
  @Input()product:Product;
  @Output() addedPhoto = new EventEmitter<Photo>();

   uploader:FileUploader;
   hasBaseDropZoneOver:boolean = false;


   //for setting mainPhoto
   currentMain:Photo;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

 

  constructor(private productService:ProductService,private alertify:AlertifyService) { }

  ngOnInit() {
    if(this.product){
      this.productService.setProductId(this.product.productId);
    }
    
    this.initializeUploader();
  }
  initializeUploader(){
    this.uploader = new FileUploader({
     
      url: 'http://localhost:5001/api-admin/products/'+this.productService.Id+'/photos',
      authToken:"Bearer "+localStorage.getItem('token'),
      isHTML5: true,
      //allow only image
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false, //we want user to click button to send this up
      maxFileSize: 10*1024*1024 //10 mb max
    });
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false;}



    //Show image immediatly after uploading
    this.uploader.onSuccessItem = (item,response,status,header)=>{
      if(response){
        //response is a string so we convert the string into an object cuz the photo is object
        const res: Photo = JSON.parse(response);
        //we build a photo object from object that returns from our server
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain:res.isMain
        };
        //console.log(photo);
        this.photos.push(photo); //we push this photo in our photo array that comes from memeber-edit
      }
    };
    
    //SETMAIN
    
  }
  
  setMainPhoto(photo: Photo){
    this.productService.setMainPhoto(this.productService.Id,photo.id).subscribe(()=>{
      //fillter all photos except main and make it false 
      this.currentMain = this.photos.filter(p=>p.isMain === true)[0];
      this.currentMain.isMain = false;
      //Set true photo thats being passed as Main 
      photo.isMain = true;
     // this.authService.changeMemberPhoto(photo.url);
      //Updating the current user and the one in localStorage with new MainPhoto
      //this.productService.currentUser.photoUrl = photo.url;

     // localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    //  this.getMemberPhotoChange.emit(photo.url);
      
    },error=>{
      this.alertify.error(error);
    });
  }

  deletePhoto(id:number){
    this.alertify.confirm("Are you sure you want to delete this photo",()=>{
      this.productService.deletePhoto(this.productService.Id,id).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p=>p.id === id),1);
      },error=>{
        this.alertify.error("Failed to delete the photo");
      });
    });
  }
}
