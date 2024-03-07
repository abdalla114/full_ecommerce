import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces/cart';
import { Products } from './interfaces/products';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value:Products[], searchKey:string): Products[] {
    return value.filter((key)=>key.title.toLowerCase().includes(searchKey.toLowerCase()))
  }

}
