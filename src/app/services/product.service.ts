import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  apiUrl = "http://31.223.4.9:5000/api/";
  constructor(private httpClient:HttpClient) { }

  getProductsByCategoryId(categoryId:number = 0):Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "Products/getproductdetailsbycategoryid?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsBySearchKey(searchKey:string = ""):Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "Products/searchall?searchKey=" + searchKey;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
