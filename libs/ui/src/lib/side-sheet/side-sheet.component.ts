import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { filter, takeWhile } from 'rxjs/operators';
import { SideSheetHeaderDirective } from './directives/side-sheet-header.directive';
/**
 * Surface containing supplementary content that is anchored to the right edge of the screen.
 * Side sheets contain content that supplements the screen's primary UI region.
 * Side sheets display a wide variety of content and layouts through content projection.
 * Side sheet itself determines it's display mode:
 * - side (default): the sheet appears side-by-side with the main content, shrinking the main content's width to make space for the sidenav
 * - over (small screen sizes): the sheet floats over the primary content, which is covered by a backdrop
 * Material reference: https://material.io/design/components/sheets-side.html#
 *
 * A side sheet has 3 sections:
 *  - header: styled title with close action, defaults to 'Info' if no <campus-side-sheet-header> tag is used
 *  - body: various content rendered in the side sheet
 *  - page: the page content which interacts with the side sheet (e.g. the sheet can slide over this page content or is displayed side-by-side)
 *
 * @example
 *  <campus-side-sheet [isOpen]="true">
 *    <campus-side-sheet-header>This is the header of the side sheet.</campus-side-sheet-header>
 *    <campus-side-sheet-body>
 *      <div>This is the sheet body</div>
 *    </campus-side-sheet-body>
 *    <campus-side-sheet-page>
 *      <div>This is a the page which interacts with the side sheet.</div>
 *    </campus-side-sheet-page>
 *  </campus-side-sheet>
 * @example
 * @export
 * @class SideSheetComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'campus-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss']
})
export class SideSheetComponent implements OnInit, OnDestroy {
  defaultHeaderText = 'Info';
  /**
   * Whether the side sheet is open on first render.
   *
   * @type {boolean}
   * @memberof SideSheetComponent
   */
  @Input() isOpenOnInit: boolean;

  /**
   * Reference to the material drawer component.
   * Used to set it's properties in code (instead of in the template).
   *
   * @type {MatDrawer}
   * @memberof SideSheetComponent
   */
  @ViewChild(MatDrawer) private sheet: MatDrawer;
  /**
   * Reference to the header directive;
   * Used to show/hide the default header text.
   *
   * @private
   * @type {SideSheetHeaderDirective}
   * @memberof SideSheetComponent
   */
  @ContentChild(SideSheetHeaderDirective)
  public header: SideSheetHeaderDirective;

  /**
   * Whether the component is still rendered.
   * Used for unsubscribing from observables.
   *
   * @memberof SideSheetComponent
   */
  private isAlive = true;

  /**
   * Stream of @media queries matching 'XSmall' breakpoint preset.
   *
   * @memberof SideSheetComponent
   */
  private xSmallMediaQuery$ = this.breakPointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small
  ]);
  /**
   * Stream of @media queries matching all breakpoints presets except 'XSmall'.
   *
   * @memberof SideSheetComponent
   */
  private otherMediaQueries$ = this.xSmallMediaQuery$.pipe(
    filter(result => !result.matches)
  );

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    // sheet property available in the OnInit life cycle
    this.xSmallMediaQuery$
      .pipe(
        takeWhile(() => this.isAlive),
        filter(result => result.matches)
      )
      .subscribe(() => {
        this.sheet.mode = 'over';
      });
    this.otherMediaQueries$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        this.sheet.mode = 'side';
      });
  }

  /**
   * Completes the internal streams.
   *
   * @memberof SideSheetComponent
   */
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  /**
   * Toggle this shide sheet.
   * @param isOpen Whether the side sheet should be open.
   * @memberof SideSheetComponent
   */
  toggle(isOpen?: boolean) {
    this.sheet.toggle(isOpen);
  }
}
