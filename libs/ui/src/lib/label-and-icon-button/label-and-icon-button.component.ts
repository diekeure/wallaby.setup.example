import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 *   <campus-label-and-icon-button
                      [label]="'Titel'"
                      [icon]="'presentatie'"
                      [iconBackgroudColor]="'red'"></campus-label-and-icon-button>
 *
 * @export
 * @class LabelAndIconButtonComponent
 */
@Component({
  selector: 'campus-label-and-icon-button',
  templateUrl: './label-and-icon-button.component.html',
  styleUrls: ['./label-and-icon-button.component.scss']
})
export class LabelAndIconButtonComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() iconClass: 'warning' | 'default' = 'default';
  @Output() iconClicked = new EventEmitter<string>();

  onIconClicked(): void {
    this.iconClicked.emit(this.label);
  }
}
