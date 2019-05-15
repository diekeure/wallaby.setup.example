import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusRoundedCorners],[rounded-corners]'
})
export class RoundedCornersDirective {
  @HostBinding('class.ui-button--rounded-corners')
  get isRoundedCornersClass() {
    return true;
  }
}
