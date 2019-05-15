import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * @example
 *   <campus-period-label
                      [titleText]="'Titel'"
                      [period]="periodValue"></campus-period-label>
 * 
 * @export
 * @class PeriodLabelComponent
 */
@Component({
  selector: 'campus-period-label',
  templateUrl: './period-label.component.html',
  styleUrls: ['./period-label.component.scss']
})
export class PeriodLabelComponent {
  @Input() titleText: string;
  @Input() period: { start: Date; end: Date };
  @Input() editable: boolean;
  @Output() editStart = new EventEmitter<boolean>();
  @Output() editEnd = new EventEmitter<boolean>();

  onEditStart(): void {
    this.editStart.emit(true);
  }

  onEditEnd(): void {
    this.editEnd.emit(true);
  }
}
