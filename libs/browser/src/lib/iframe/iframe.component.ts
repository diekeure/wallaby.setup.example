import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WINDOW } from '../window/window';

@Component({
  selector: 'campus-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IframeComponent {
  url: SafeUrl;
  constructor(
    sanitizer: DomSanitizer,
    dialogRef: MatDialogRef<IframeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    @Inject(WINDOW) public window: Window
  ) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl(data.url);
    this.window.addEventListener(
      'message',
      function(ev) {
        if (ev.data === 'close') {
          dialogRef.close();
        }
      },
      false
    );
  }
}
