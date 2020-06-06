import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExternal'
})
export class FilterExternalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultExternal = [];
    for (const external of value) {
      if (external.reason.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultExternal.push(external);
      }
    }
    return resultExternal;
  }

}//End class