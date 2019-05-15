import { Component, Input } from '@angular/core';

/**
 * @example
 *   <campus-content-preview 
                              [preview]="'https://d1fh3heiqa6frl.cloudfront.net/890f054414a06a81489f35e6b27fc23c9ee12d0ce4e0a867801a569a073438de/7bc034592d6ea1a4ec2f3e99eb63ad56_340-1.png'"
                              [titleText]="'the title'"
                              [description]="'descriptions yo'">
        <campus-file-extension-presenter type
                                        [extension]="'xls'"></campus-file-extension-presenter>
        <div icon
            class="polpo-presentatie"></div>
        <div badge
            *ngFor="let badge of ['method1', 'method2']">
          {{badge}}
        </div>
      </campus-content-preview>
 * 
 * @export
 * @class ContentPreviewComponent
 */
@Component({
  selector: 'campus-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent {
  @Input() preview: string;
  @Input() titleText: string;
  @Input() description: string;
}
