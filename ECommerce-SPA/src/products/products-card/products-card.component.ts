import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {
  @Input() product:Product;
  mainPhotoUrl: string;
  constructor() { }

  ngOnInit() {
    this.getMainPhoto();
  }
  getMainPhoto() {
    for (let i = 0; i < this.product.photos.length; i++) {
      if (this.product.photos[i].isMain) {
          this.mainPhotoUrl = this.product.photos[i].url;
      }
    }
  }

}
