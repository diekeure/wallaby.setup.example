import { Directive } from '@angular/core';
/**
 * Body of a side sheet, needed as it's used as a selector.
 *
 * @export
 * @class SideSheetBodyDirective
 */
@Directive({
  selector: '[campusSideSheetBody], campus-side-sheet-body'
})
export class SideSheetBodyDirective {
  constructor() {}
}
