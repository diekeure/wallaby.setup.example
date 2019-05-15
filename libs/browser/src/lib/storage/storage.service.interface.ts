import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE_SERVICE_TOKEN = new InjectionToken(
  'browser storage service'
);

export interface StorageServiceInterface {
  get(key: string);
  set(key: string, value: string);
  remove(key: string);
  clear();
}
