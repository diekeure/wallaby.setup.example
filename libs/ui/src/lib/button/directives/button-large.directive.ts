import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusLarge],[large]'
})
export class LargeDirective {
  @HostBinding('class.ui-button--large')
  get isLargeClass() {
    return true;
  }
}
