export interface Product{
  id:number;
  categoryId:number;
  name:string;
  brand:string;
  description:string;
  unit:string;
  wholesalePrice:number;
  retailPrice:number;
  minQuantityForWholesale:number;
  stockAmount:number;
  isActive:boolean;
  ImagePaths:string[]
}
