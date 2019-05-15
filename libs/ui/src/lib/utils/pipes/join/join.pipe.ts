import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  transform(value: any[], property: string, delimiter: string = ', ') {
    return value.map(v => v[property]).join(delimiter);
  }
}
