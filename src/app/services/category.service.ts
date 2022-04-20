import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://31.223.4.9:5000/api/";
  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "Categories/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  addCategory(categoryName:string): Observable<ResponseModel>{
    let category: Category = {
      id : 0,
      name : categoryName,
      topCategoryId : 3
    }

    let newPath = this.apiUrl + "Categories/add";
    console.log(category);
    return this.httpClient.post<ResponseModel>(
      newPath,
      category
    )
  }
}
