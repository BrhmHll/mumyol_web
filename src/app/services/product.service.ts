import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  apiUrl = "http://31.223.4.9:5000/api/Products/getproductdetailsbycategoryid";
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>>{
    return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl);
  }
}
