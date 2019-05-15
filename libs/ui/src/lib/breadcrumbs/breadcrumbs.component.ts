import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'campus-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() seperator = 'seperator';
  @Input() breadCrumbs: BreadcrumbLinkInterface[] = [];
  @Input() baseIcon = 'home';
  @Input() overflowedLinkString = '…';
  @Input() maxLength = 99;
  @Input() baseUrl = '/';

  @HostBinding('class.ui-breadcrumbs')
  get uiBreadcrumbClass() {
    return true;
  }
}

export interface BreadcrumbLinkInterface {
  displayText: string;
  link: string[]; // see routerlink docs
}
