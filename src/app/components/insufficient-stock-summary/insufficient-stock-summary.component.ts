import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InsufficientStock } from 'src/app/models/insufficientStock';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-insufficient-stock-summary',
  templateUrl: './insufficient-stock-summary.component.html',
  styleUrls: ['./insufficient-stock-summary.component.css']
})
export class InsufficientStockSummaryComponent implements OnInit {

  insufficientStocks:InsufficientStock[] = [];

  constructor(private orderService:OrderService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getInsufficientStock()
  }

  getInsufficientStock(){
    this.orderService.getInsufficientStocks().subscribe((response) => {
      if (response.success) {
        this.insufficientStocks = response.data;
      }
    })
  }

  checkInsufficientStocks(){
    if (this.insufficientStocks.length === 0) {
      this.toastrService.info("Yetersiz stok bulunmuyor...");
    }
  }

}
