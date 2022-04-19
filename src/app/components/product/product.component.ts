import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http'
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  dataLoaded:boolean = false;
  searchKey = "";
  apiUrl = "http://31.223.4.9:5001"; //resim server

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategoryId(params["categoryId"]);
    });
  }


  getProductsByCategoryId(categoryId:number){
    this.dataLoaded =false;
    this.productService.getProductsByCategoryId(categoryId).subscribe(response => {
      if(response.success)
        this.products = response.data;
        this.dataLoaded = true;
    })
  }

  getProductClass(product:Product){
    if (product.stockAmount < 10) {
      return "table-danger button";
    }else if(product.stockAmount < 50){
      return "table-warning button";
    }else{
      return "";
    }
  }

  goProductDetailPage(product:Product){
    console.log(product.name)
  }

  search(){
    if (this.searchKey.length < 3)
     return;
    this.dataLoaded =false;
    this.productService.getProductsBySearchKey(this.searchKey).subscribe(response => {
      if(response.success)
        this.products = response.data;
        this.dataLoaded = true;
    })
  }

  getSearchProductButtonClass(){
    if (this.searchKey.length < 3) {
      return "btn btn-outline-success disabled";
    }
    return "btn btn-outline-success";
  }

}
