import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AlertifyService } from 'src/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/product';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  product:Product;
  mainIndex: number;
  temp: number;
    //We need this properties for gallery in our Photo tabs
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
  constructor(private productService:ProductService,private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.product = data['product'];
    })


      //this is how we want our gallery to look
  this.galleryOptions = [
    {
        width: '500px',
        height: '500px',
        imagePercent:100,
        //thumbnailColums- number of images underneth main(largest) image
        thumbnailsColumns: 4,
        imageAnimation:NgxGalleryAnimation.Slide,
        //this pervents user for clicking the screen and go in see the full image
        preview:false
    }
  ];

    //we need to provide this array of object with small medium and big photos 
    //we have the same picture for small medium and big
    this.galleryImages = this.getImages();
  
  }

  getImages() {
    const imageUrls = [];
   
    for (let i = 0; i < this.product.photos.length; i++) {
      if (this.product.photos[i].isMain) {
        this.mainIndex = i;
      }

      imageUrls.push({
        small: this.product.photos[i].url,
        medium: this.product.photos[i].url,
        big: this.product.photos[i].url,
        description: this.product.photos[i].description
      });
    }
    this.temp = imageUrls[0];
    imageUrls[0] = imageUrls[this.mainIndex];
    imageUrls[this.mainIndex] = this.temp;
    return imageUrls;
  }

  }


