import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform(value: Map<number, any>, args?: any): any {
    let keys = [];
    /*for (let key in value) {
      keys.push({key: key, value: value[key]});
    }*/
    value.forEach((v, k) => keys.push({key: k, value: v}))
    return keys;
  }

}
