import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[campusDropdown],[dropdown]'
})
export class DropdownDirective {
  @HostBinding('class.ui-notification--dropdown')
  get isDropdownClass() {
    return true;
  }
}
