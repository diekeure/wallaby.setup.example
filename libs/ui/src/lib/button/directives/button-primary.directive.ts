import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusPrimary],[primary]'
})
export class PrimaryDirective {
  @HostBinding('class.ui-button--primary')
  get isPrimaryClass() {
    return true;
  }
}
