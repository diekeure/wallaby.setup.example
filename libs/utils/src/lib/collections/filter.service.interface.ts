import { InjectionToken } from '@angular/core';
import { NestedPartial } from '../types/nestedpartial';

export const FILTER_SERVICE_TOKEN = new InjectionToken('FilterService');

export interface FilterServiceInterface {
  filter<T>(list: T[], filters: NestedPartial<T>, ignoreCase?: boolean): T[];
}
