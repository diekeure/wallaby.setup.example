import { Injectable } from '@angular/core';
import { NestedPartial } from '../types/nestedpartial';
import { FilterServiceInterface } from './filter.service.interface';
@Injectable({
  providedIn: 'root'
})
export class FilterService implements FilterServiceInterface {
  filter<T>(
    list: T[],
    filters: NestedPartial<T>,
    ignoreCase: boolean = true
  ): T[] {
    return list.filter(item => this.compareObjects(item, filters, ignoreCase));
  }
  private compareObjects<T>(
    item: T,
    filters: NestedPartial<T>,
    ignoreCase: boolean = true
  ): boolean {
    // compare dates, ignore timestamps
    if (item instanceof Date && filters instanceof Date) {
      const itemDate = new Date(item);
      const filterDate = new Date(filters);
      itemDate.setHours(0, 0, 0);
      filterDate.setHours(0, 0, 0);
      return itemDate.getTime() === filterDate.getTime();
    }
    // smart way to check if the object is not a primitive type (underscore.js way)
    if (filters === Object(filters)) {
      // check all properties in filters
      return Object.keys(filters).reduce((match: boolean, key: string) => {
        // whenever a match failed, there's no point in checking other properties
        return (
          match && this.compareObjects(item[key], filters[key], ignoreCase)
        );
      }, true);
    }
    // check for exact matches on number
    if (typeof item === 'number' && typeof filters === 'number') {
      return item === filters;
    }
    // check for partial match on string
    let itemStr = item ? item.toString() : '';
    let filterStr = filters.toString();
    if (ignoreCase) {
      itemStr = itemStr.toLowerCase();
      filterStr = filterStr.toLowerCase();
    }
    return itemStr.includes(filterStr);
  }
}
