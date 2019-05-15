import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * @example
 *   <campus-confirmable-select 
                           [label]="'status'"
                           [options]="['one', 'two']"
                           [selectedOption]="'one'"
                           [confirmIcon]="'polpo-presentatie'"
                           [text]="'some explenation'"
                           (clickConfirm)="saveStatus($event)"></campus-confirmable-select>
 * 
 * @export
 * @class confirmableSelectComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'campus-confirmable-select',
  templateUrl: './confirmable-select.component.html',
  styleUrls: ['./confirmable-select.component.scss']
})
export class ConfirmableSelectComponent {
  @Input() label: string;
  @Input() text: string;
  @Input() confirmIcon: string;
  @Input()
  set selectedOption(option) {
    this.selectControl.setValue(option);
    this.selectControl.markAsPristine();
  }
  @Input() options: SelectOption[];
  @Output() clickConfirm = new EventEmitter<SelectOption>();

  selectControl: FormControl = new FormControl(
    this.selectedOption,
    Validators.required
  );

  onClickConfirm(): void {
    this.selectControl.markAsPristine();
    const returnOption = this.options.find(
      o => o.value === this.selectControl.value
    );
    this.clickConfirm.emit(returnOption);
  }
}

export interface SelectOption {
  value: any;
  viewValue: string;
}
