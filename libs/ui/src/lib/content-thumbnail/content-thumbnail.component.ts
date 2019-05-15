import { Component, Input } from '@angular/core';
import { ListFormat } from '../list-view/enums/list-format.enum';
import { ListViewItemInterface } from '../list-view/interfaces/list-view-item';

@Component({
  selector: 'campus-content-thumbnail',
  templateUrl: './content-thumbnail.component.html',
  styleUrls: ['./content-thumbnail.component.scss'],
  providers: [
    {
      provide: ListViewItemInterface,
      useExisting: ContentThumbnailComponent
    }
  ]
})
export class ContentThumbnailComponent implements ListViewItemInterface {
  public listFormatEnum = ListFormat;

  @Input() listFormat: ListFormat;
  @Input() title: string;
  @Input() learningArea: string;
  @Input() contentTypeClass: string;
  @Input() imagePath: string;
  @Input() fileExtensionClass: string;
  @Input() fileTypeLabel: string;
}
