import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSupplier'
})
export class FilterSupplierPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultSupplier = [];
    for (const supplier of value) {
      if (supplier.companyName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultSupplier.push(supplier);
      }
    }
    return resultSupplier;
  }
}
