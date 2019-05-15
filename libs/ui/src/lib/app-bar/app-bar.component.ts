import { Component } from '@angular/core';
/**
 * Provides a flexbox container to use as a Top App Bar.
 * https://material.io/develop/android/components/app-bar-layout/
 *
 * Uses css attribute selectors to project content in sections.
 * Use bar__left, bar__center and bar__right attributes to assign content to a section.
 * Content without an attribute is projected to the left section.
 *
 * @export
 * @class AppBarComponent
 */
@Component({
  selector: 'campus-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.theme.scss', './app-bar.component.scss']
})
export class AppBarComponent {}
