import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSlice'
})
export class FilterSlicePipe implements PipeTransform {

  transform(value: string[], data: any, len: number = 4): unknown {
    return value
      .filter(x => typeof data[x] !== 'object' || data[x] instanceof Date)
      .slice(0, len);
  }

}
