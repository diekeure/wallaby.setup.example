import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * @example
 *   <campus-input-label
                      [titleText]="'Titel'"
                      [text]="'name'"></campus-input-label>
 * 
 * @export
 * @class InputLabelComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'campus-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss']
})
export class InputLabelComponent implements OnInit {
  @Input() titleText: string;
  @Input() text: string;
  @Input() editable: boolean;
  @Output() saveText = new EventEmitter<string>();

  editing: boolean;
  inputControl: FormControl;

  ngOnInit(): void {
    this.editing = false;
    this.inputControl = new FormControl(this.text, Validators.required);
  }

  edit(): void {
    this.inputControl.setValue(this.text);
    this.editing = !this.editing;
  }

  cancel(): void {
    this.editing = !this.editing;
  }

  save(): void {
    this.saveText.emit(this.inputControl.value);
    this.editing = !this.editing;
  }
}
