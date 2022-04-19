import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://31.223.4.9:5000/api/";
  constructor(private httpClient:HttpClient) { }

  getCategories(){
    let newPath = this.apiUrl + "Categories/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  addCategory(categoryName:string){
    let newPath = this.apiUrl + "Categories/add";
    // this.httpClient.post{
    //   url: newPath
    //   observe: {

    //   }
    // };
  }
}
