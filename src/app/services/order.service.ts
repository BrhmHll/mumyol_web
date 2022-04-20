import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsufficientStock } from '../models/insufficientStock';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "http://31.223.4.9:5000/api/";
  constructor(private httpClient:HttpClient) { }

  getInsufficientStocks() : Observable<ListResponseModel<InsufficientStock>>{
    let newPath = this.apiUrl + "Order/getallinsufficientstocks";
    return this.httpClient.get<ListResponseModel<InsufficientStock>>(newPath);
  }
}
