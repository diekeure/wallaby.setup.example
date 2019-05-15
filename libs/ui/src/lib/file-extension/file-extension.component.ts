import { Component, Input } from '@angular/core';
/**
 * Presents the icon of an extension
 *
 * @param {string} extensionClass - The Css classname associated with the extension.
 * @param {boolean} showTitle - Sets the visibility of the title on the component.
 * @param {boolean} showIcon - Sets the visibility of the icon on the component.
 *
 * @export
 * @class FileExtensionComponent
 */
@Component({
  selector: 'campus-file-extension',
  templateUrl: './file-extension.component.html',
  styleUrls: ['./file-extension.component.scss']
})
export class FileExtensionComponent {
  @Input() extensionClass = '';
  @Input() title = '';
  @Input() showTitle = true;
  @Input() showIcon = true;

  get titleContent(): string {
    return this.showTitle ? this.title || this.extensionClass : '';
  }
}
