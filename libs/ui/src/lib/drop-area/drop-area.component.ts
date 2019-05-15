import { Component, Input } from '@angular/core';

@Component({
  selector: 'campus-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss']
})
export class DropAreaComponent {
  private _dragOverClassName: string;
  dragging: boolean;

  @Input() icon: string;
  @Input() label: string;
  @Input() forceJustifyContentLeft = false;
  @Input()
  public set dragOverClassName(value: string) {
    if (value) this._dragOverClassName = value;
  }
  public get dragOverClassName() {
    return this.dragging ? this._dragOverClassName : '';
  }
}
