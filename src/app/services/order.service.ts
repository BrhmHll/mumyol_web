import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsufficientStock } from '../models/insufficientStock';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderDetails } from '../models/orderDetails';
import { ResponseModel } from '../models/ResponseModel';

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

  getOrdersByStatusId(statusId:number) : Observable<ListResponseModel<OrderDetails>>{
    let newPath = this.apiUrl + "Order/getallordersbystatusid?statusId=" + statusId.toString();
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);
  }

  updateOrder(orderId:number, statusId:number) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "Order/updateorderstatus";
    return this.httpClient.post<ResponseModel>(newPath,
      {
        "orderId" : orderId,
        "statusId" : statusId
      });
  }
}
