import { Component, Input } from '@angular/core';
import { BadgePersonInterface } from '../person-badge/person-badge.component';

@Component({
  selector: 'campus-person-summary',
  templateUrl: './person-summary.component.html',
  styleUrls: ['./person-summary.component.scss']
})
export class PersonSummaryComponent {
  @Input() person: BadgePersonInterface;
  @Input() connectionTypeIcon = '';
}
