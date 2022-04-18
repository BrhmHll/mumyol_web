import { Pipe, PipeTransform } from '@angular/core';
import { ProductComponent } from '../components/product/product.component';
import { Product } from '../models/product';

@Pipe({
  name: 'searchKey'
})
export class SearchKeyPipe implements PipeTransform {

  transform(value:Product[], searchKey: string): Product[] {
    searchKey = searchKey && searchKey.length > 2 ? searchKey.toLocaleLowerCase() : "";
    return searchKey ? value.filter(p => p.name.toLocaleLowerCase().indexOf(searchKey) !== -1) : value;
  }
}
