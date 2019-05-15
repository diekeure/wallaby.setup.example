import { Component, Input } from '@angular/core';

/**
 * Styles the page header.
 *
 * @param {string} [iconClass] - Css classname for icon
 * @param {string} [title] - the title
 * @param {string} [subtitle] - the subtitle
 *
 * @export
 * @class PageHeaderComponent
 *
 */
@Component({
  selector: 'campus-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: [
    './page-header.component.theme.scss',
    './page-header.component.scss'
  ]
})
export class PageHeaderComponent {
  @Input() iconClass: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() layout: 'default' | 'centered' = 'default';
}
