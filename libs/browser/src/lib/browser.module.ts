import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IframeComponent } from './iframe/iframe.component';
import { StorageService } from './storage/storage.service';
import { BROWSER_STORAGE_SERVICE_TOKEN } from './storage/storage.service.interface';
import { WindowService } from './window/window.service';
import { WINDOW_SERVICE_TOKEN } from './window/window.service.interface';
@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: BROWSER_STORAGE_SERVICE_TOKEN, useClass: StorageService },
    { provide: WINDOW_SERVICE_TOKEN, useClass: WindowService }
  ],
  exports: [IframeComponent],
  declarations: [IframeComponent],
  entryComponents: [IframeComponent]
})
export class BrowserModule {}
