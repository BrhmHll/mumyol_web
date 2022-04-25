import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { environment as env_prod } from 'src/environments/environment.prod';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = isDevMode() ? env.apiUrl : env_prod.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "Categories/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  addCategory(categoryName:string): Observable<ResponseModel>{
    let category: Category = {
      id : 0,
      name : categoryName,
      imagePath: ""
    }

    let newPath = this.apiUrl + "Categories/add";
    console.log(category);
    return this.httpClient.post<ResponseModel>(
      newPath,
      category
    )
  }

  addCategoryImage(image:File, categoryId:number){
    const formData: FormData = new FormData();
    formData.append('Image', image);
    formData.append('categoryId', categoryId.toString());
    let newPath = this.apiUrl + "Categories/modifyimage";
    return this.httpClient.post<ResponseModel>(newPath, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
}
