import { Component, HostBinding, Input } from '@angular/core';

/**
 * Generic button
 * Standard styles are applied with directives: border, disabled, rounded,
 * tooltip(with string), warning and danger.
 * The icon css class is set in [iconClass].
 *
 * @export
 * @class ButtonComponent
 */
@Component({
  selector: 'campus-button, [campus-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() iconClass: string;

  @HostBinding('class.ui-button') uiButtonClass = true;
}
