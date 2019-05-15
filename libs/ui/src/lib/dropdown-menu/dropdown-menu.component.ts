import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
/**
 * Dropdown menu with optional header and a body with projected content.
 *  - Usage: appears upon interaction with an element (e.g. button) or when a user performs a specific action.
 *    Exposes an 'toggle' method for this purpose.
 *  - Placement: the menu is positioned relative to both the element that generates them and the edges of the screen or browser.
 *    They can appear in front of, beside, above, or below the element that generates them.
 * @example
 *  <campus-dropdown-menu #dropDown
 *              [showHeader]="true"
                headerIcon="timeline"
                linkText="alle meldingen"
                linkUrl="/notifications"
                newItemCount="16"
                itemType="meldingen">
      <div>I am projected inside the dropdown body</div>
 *  </campus-dropdown-menu>
 * @example
 * @export
 * @class DropdownMenuComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'campus-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: [
    './dropdown-menu.component.scss',
    './dropdown-menu.component.theme.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DropdownMenuComponent {
  @Input() showHeader = false;
  @Input() headerIcon: string;
  @Input() itemType: string;
  @Input() newItemCount: string;
  @Input() linkText: string;
  @Input() linkUrl: string;
  @Input() smallWidth: boolean;

  @ViewChild(MatMenuTrigger) private trigger: MatMenuTrigger;

  toggle() {
    this.trigger.openMenu();
  }
}
