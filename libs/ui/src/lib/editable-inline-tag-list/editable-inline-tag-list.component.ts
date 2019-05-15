import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * @example
 * <campus-editable-inline-tag-list 
                         [titleText]="'Geselecteerd items'"
                         [items]="[{text: 'one'},{text: 'two', count: 12},{text: 'two', count: 1, editable: 3}]"></campus-editable-inline-tag-list>
 * 
 * @export
 * @class EditableInlineTagListComponent
 * 
 * Component to display list of items inline, and optionally let user add or remove items.
 */
@Component({
  selector: 'campus-editable-inline-tag-list',
  templateUrl: './editable-inline-tag-list.component.html',
  styleUrls: ['./editable-inline-tag-list.component.scss']
})
export class EditableInlineTagListComponent {
  @Input() titleText: string;
  @Input()
  items: { text: string; count?: number; editable?: boolean; data?: any }[];
  @Input() editable: boolean;
  @Output() editClicked = new EventEmitter<boolean>();
  @Output() itemRemoveClicked = new EventEmitter<any>();

  onItemRemoveClick(item: any): void {
    this.itemRemoveClicked.emit(item);
  }

  onEditClicked(): void {
    this.editClicked.emit(true);
  }
}
