import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDiscount'
})
export class CalculateDiscountPipe implements PipeTransform {

  transform(wholesalePrice: number,  retailPrice:number): number {
    return 100 - ((wholesalePrice / retailPrice) * 100);
  }

}
