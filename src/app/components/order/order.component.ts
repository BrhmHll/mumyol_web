import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from 'src/app/models/orderDetails';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private orderService:OrderService, private toastrService:ToastrService) { }

  selectedTabId:number = 1;
  orders:OrderDetails[] = [];
  searchKey:string = "";
  process = {
    "orderId" : 0,
    "statusId" : 0
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["statusId"]) {
        this.selectedTabId = params["statusId"];
      }
      this.getOrdersByStatusId();
    });
  }

  setSelectedProcess(orderId:number, statusId:number){
    this.process.orderId = orderId;
    this.process.statusId = statusId;
  }
  getTabClass(tabId:number){
    if (this.selectedTabId == tabId) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  }

  getTotalPrice(order:OrderDetails){
    let totalPrice = 0;
    order.orderItems.forEach(item => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  }

  getStatusText(statusId:number){
    if(statusId===1)
      return "Yeni";
    if(statusId===2)
      return "Bekleyen";
    if(statusId===5)
      return "Tamamlanan";
    if(statusId===6)
      return "Iptal";
    return "";

  }

  getOrdersByStatusId(){
    this.orderService.getOrdersByStatusId(this.selectedTabId).subscribe(data => {
      if (data.success) {
        this.orders = data.data;
      } else {
        this.toastrService.error(data.message, "Hata");
      }
    });
  }

  updateOrder(){
    this.orderService.updateOrder(this.process.orderId, this.process.statusId).subscribe(data => {
      if (data.success) {
        this.toastrService.success(data.message, "Başarılı");
        this.getOrdersByStatusId();
      } else {
        this.toastrService.error(data.message, "Hata");
      }
    });
  }

  getRowClass(order:OrderDetails){
    // var diffOfHour = (Date.now() - order.createdDate.getMilliseconds()) / 3600000;
    // var diffOfHour = this.calculateDiff(order.createdDate);
    // let currentDate = new Date();
    // let dateSent = new Date(order.createdDate);
    // var diffOfHour = currentDate.getHours() - dateSent.getHours();
    // console.log(diffOfHour);
    // if (diffOfHour < 6) {
    //   return "table-danger";
    // }
    // if (diffOfHour < 24) {
    //   return "table-warning";
    // }

    return "";
  }


}
