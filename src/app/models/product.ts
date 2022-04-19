import { ProductImage } from "./productImage";

export interface Product{
  id:number;
  categoryId:number;
  categoryName:string;
  name:string;
  brand:string;
  description:string;
  unit:string;
  wholesalePrice:number;
  retailPrice:number;
  minQuantityForWholesale:number;
  stockAmount:number;
  isActive:boolean;
  imagePaths:string[];
  payBackRate:number;
  purchasePrice:number;
}
