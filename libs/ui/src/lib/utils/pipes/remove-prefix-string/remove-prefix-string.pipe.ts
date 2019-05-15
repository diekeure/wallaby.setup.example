import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removePrefixString' })
export class RemovePrefixStringPipe implements PipeTransform {
  transform(value: string, prefix: string): string {
    if (value.indexOf(prefix) !== 0) return value;
    return value.substring(prefix.length);
  }
}
