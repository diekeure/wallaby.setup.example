import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusWarning],[warning]'
})
export class WarningDirective {
  @HostBinding('class.ui-button--warning')
  get isWarningClass() {
    return true;
  }
}
