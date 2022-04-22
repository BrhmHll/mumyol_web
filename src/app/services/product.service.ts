import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductImage } from '../models/productImage';
import { ResponseModel } from '../models/ResponseModel';

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

  addProduct(product:Product) : Observable<DataResponseModel<Product>>{
    let newPath = this.apiUrl + "Products/add";
    return this.httpClient.post<DataResponseModel<Product>>(newPath, product)
  }

  updateProduct(product:Product) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "Products/update";
    return this.httpClient.post<ResponseModel>(newPath, product)
  }

  getProduct(id:number) : Observable<DataResponseModel<Product>>{
    let newPath = this.apiUrl + "Products/getbyid?id=" + id;
    return this.httpClient.get<DataResponseModel<Product>>(newPath);
  }

  addProductImage(image:File, productId:number) : Observable<ResponseModel>{
    const formData: FormData = new FormData();
    formData.append('Image', image);
    formData.append('productId', productId.toString());
    let newPath = this.apiUrl + "ProductImage/addnewproductimage";
    return this.httpClient.post<ResponseModel>(newPath, formData
      )
  }

  getProductImages(productId:number) : Observable<ListResponseModel<ProductImage>>{
    let newPath = this.apiUrl + "ProductImage/getallimagesbyproductid?productId=" + productId;
    return this.httpClient.get<ListResponseModel<ProductImage>>(newPath);
  }

  deleteProductImageByImageId(imageId:number) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "ProductImage/deleteproductimage?imageId=" + imageId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
