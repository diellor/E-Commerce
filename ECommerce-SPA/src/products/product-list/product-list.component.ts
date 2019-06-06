import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  constructor(private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.products = data['products'];
    })
  }

}
