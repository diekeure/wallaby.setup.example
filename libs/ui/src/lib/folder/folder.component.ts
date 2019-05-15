import { Component, Input } from '@angular/core';
import { ListFormat } from '../list-view/enums/list-format.enum';
import { ListViewItemInterface } from '../list-view/interfaces/list-view-item';

@Component({
  selector: 'campus-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  providers: [
    {
      provide: ListViewItemInterface,
      useExisting: FolderComponent
    }
  ]
})
export class FolderComponent implements ListViewItemInterface {
  public showEmptyError: boolean;
  public progressDiameter: number;
  private _listFormat: ListFormat;

  @Input() title: string;
  @Input() icon: string;
  @Input() itemCount: string;
  @Input() backgroundColor = '#000000';

  // mat-spinner settings
  @Input() progress?: number;
  @Input() progressDiameterGrid? = 48 + 2; // default value of icon in theme + margin*2
  @Input() progressDiameterLine? = 32 + 2; // default value of icon in theme + margin*2
  @Input() progressTheme?; // refers to theme-angular-material.css themes

  public listFormatEnum = ListFormat;

  // mat-spinner size is dependent on icon size, which is dependent on list format
  @Input()
  get listFormat() {
    return this._listFormat;
  }
  set listFormat(value) {
    if (value && value !== this._listFormat) {
      this._listFormat = value;

      switch (value) {
        case ListFormat.GRID:
          this.progressDiameter = this.progressDiameterGrid;
          break;
        case ListFormat.LINE:
          this.progressDiameter = this.progressDiameterLine;
          break;
        default:
          this.progressDiameter = 0; //no valid ListFormat -> no spinner
          break;
      }
    }
  }

  /**
   * Whether to show an exclamation mark when folder is empty (itemCount is zero).
   *
   * @memberof FolderComponent
   */
  @Input()
  set errorOnEmpty(value) {
    if (value) {
      if (
        isNaN(parseInt(this.itemCount, 10)) ||
        parseInt(this.itemCount, 10) === 0
      ) {
        this.showEmptyError = true;
      }
    }
  }
}
