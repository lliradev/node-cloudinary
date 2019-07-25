import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCountInternal'
})
export class FilterCountInternalPipe implements PipeTransform {

  transform(items: any[], attr: string): any {
    return items.reduce((a, b) => a + b[attr], 0);
  }

}//End class
