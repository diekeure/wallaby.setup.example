import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusDanger],[danger]'
})
export class DangerDirective {
  @HostBinding('class.ui-button--danger')
  get isDangerClass() {
    return true;
  }
}
