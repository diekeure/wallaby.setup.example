import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusCircle],[circle]'
})
export class CircleDirective {
  @HostBinding('class.ui-button--circle')
  get isCircleClass() {
    return true;
  }
}
