import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('WindowToken', {
  providedIn: 'root',
  factory: () => window
});
