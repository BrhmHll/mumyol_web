import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://31.223.4.9:5000/api/Categories/getall";
  constructor(private httpClient:HttpClient) { }

  getCategories(){
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);
  }
}
