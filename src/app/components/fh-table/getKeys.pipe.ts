import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getKeys',
})
export class GetKeysPipe implements PipeTransform {
  transform(v: any, property: string): string[] {
    return Array.isArray(v)
      ? v.map((elem) => elem[property])
      : Object.keys(v).map((_) => v[property]);
  }
}
