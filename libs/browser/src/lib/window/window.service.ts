import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IframeComponent } from '../iframe/iframe.component';
import { WINDOW } from './window';
import { WindowServiceInterface } from './window.service.interface';

/**
 * Class window service is used to add additional services to the native window.
 * When you need native window functionality, inject WINDOW instead
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService implements WindowServiceInterface {
  private _openedWindows: { [name: string]: Window } = {};
  constructor(
    @Inject(WINDOW) private nativeWindow: Window,
    public dialog: MatDialog
  ) {}

  openWindow(name: string, url: string, useIframe: boolean = false) {
    if (!useIframe) {
      const openedWindow = this.nativeWindow.open(url, name);
      this._openedWindows[name] = openedWindow;
    } else {
      this.dialog.open(IframeComponent, {
        data: {
          url: url
        },
        panelClass: 'ui-iframe--fullscreen'
      });
    }
  }
  closeWindow(name: string) {
    if (this._openedWindows[name]) {
      this._openedWindows[name].close();
      delete this._openedWindows[name];
    }
  }

  get openedWindows(): { [name: string]: Window } {
    return this._openedWindows;
  }
}
