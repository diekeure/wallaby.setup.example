import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'campus-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() secondaryActions: TileSecondaryActionInterface[];

  constructor(private router: Router) {}

  onActionClick(event: Event, action: TileSecondaryActionInterface) {
    if (action.onClick) {
      action.onClick(event);
    } else if (action.routerLink) this.router.navigate(action.routerLink);
  }
}

export interface TileSecondaryActionInterface {
  label: string;
  icon?: string;
  routerLink?: string[];
  onClick?: (event: Event) => void;
}
