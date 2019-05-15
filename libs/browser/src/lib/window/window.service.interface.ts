import { InjectionToken } from '@angular/core';

export const WINDOW_SERVICE_TOKEN = new InjectionToken('window service');

export interface WindowServiceInterface {
  readonly openedWindows: { [name: string]: Window };
  openWindow(name: string, url: string, useIFrame: boolean);
  closeWindow(name: string);
}
