import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http'
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  dataLoaded:boolean = false;
  showDetail:boolean = false;
  searchKey = "";
  apiUrl = environment.staticFilesUrl; //resim server
  searchedKey = "";

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategoryId(params["categoryId"]);
    });
  }

  setShowDetail(){
    this.showDetail = !this.showDetail;
    // this.products.sort(( p1, p2 ) => {
    //   if (p1.name.toLocaleLowerCase() > p2.name.toLocaleLowerCase()) {
    //     return 1;
    // }

    // if (p1.name.toLocaleLowerCase() < p2.name.toLocaleLowerCase()) {
    //     return -1;
    // }

    // return 0;
    // });

    //Turkce karaktere gore sorting
    // this.products.sort((a,b) => {
    //   var atitle = a.name;
    //   var btitle = b.name;
    //   var alfabe = "AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789";
    //   if (atitle.length === 0 || btitle.length === 0) {
    //       return atitle.length - btitle.length;
    //   }
    //   for(var i=0;i<atitle.length && i<btitle.length;i++){
    //       var ai = alfabe.indexOf(atitle[i]);
    //       var bi = alfabe.indexOf(btitle[i]);
    //       if (ai !== bi) {
    //           return ai - bi;
    //       }
    //   }
    //   return 0;
    // });
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
    this.toastrService.success("Urun detayina gidiliyor...", product.name);
    console.log(product.name)
  }

  searchClose(){
    this.searchedKey = "";
    this.searchKey = "";
    this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategoryId(params["categoryId"]);
    });
  }

  search(){
    if (this.searchKey.length < 3)
     return;
    this.dataLoaded =false;
    this.productService.getProductsBySearchKey(this.searchKey).subscribe(response => {
      if(response.success)
        this.searchedKey = this.searchKey;
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
