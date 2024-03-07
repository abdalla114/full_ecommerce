import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string,noOfChar: number): string {
    return value.split(' ').slice(0,noOfChar).join(' ')
  }

}
