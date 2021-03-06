import { Directive, HostListener } from '@angular/core';

@Directive({
  selector:
    '[campusClickPreventDefault],[clickPreventDefault],[click-prevent-default]'
})
export class ClickPreventDefaultDirective {
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
  }
}
