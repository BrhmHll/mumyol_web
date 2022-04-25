import { OrderItemDetail } from "./orderItemDetail";

export interface OrderDetails{
  orderId:number;
  userId:number;
  userName:string;
  userSurname:string;
  userPhone:string;
  userEmail:string;
  payBack:number;
  cost:number;
  totalPrice:number;
  orderStatus:number;
  address:string;
  createdDate:Date;
  orderItems:OrderItemDetail[];
}
