import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, takeWhile } from 'rxjs/operators';

/**
 * Component that acts a a skeleton for the app.
 * Contains placeholders for left-side content, logo, header-bar and body content
 * Handles responsiveness for the side content as well
 * @example
 * <campus-shell>
 *   <campus-shell-logo>
 *       <img src="logo.png" alt="Logo">
 *   </campus-shell-logo>
 *   <campus-shell-left>
 *       <ul>
 *           <li><a href="#">home</a></li>
 *           <li><a href="#">about</a></li>
 *       </ul>
 *   </campus-shell-left>
 *   <campus-shell-top>
 *       Home > dashboard
 *   </campus-shell-top>
 *   <h1>Hello world</h1>
 *   <p>Is it wrong to be strong?</p>
 * </campus-shell>
 */
@Component({
  selector: 'campus-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  /**
   * Whether the component is still rendered.
   * Used for unsubscribing from subscriptions.
   */
  private isAlive = true;
  private _sidebarOpen: boolean;

  /**
   * Stream of @media queries matching 'XSmall' breakpoint preset.
   */
  private xSmallMediaQuery$ = this.breakPointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(shareReplay(1));

  @Input()
  set sidebarOpen(val: boolean) {
    if (val !== this._sidebarOpen) {
      this._sidebarOpen = val;
      this.sidebar.toggle(val);
      this.sidebarToggled.next(val);
    }
  }

  @Output() sidebarToggled = new EventEmitter<boolean>();

  /**
   * Reference to the material drawer component in the template
   *
   * @type {MatDrawer}
   */
  @ViewChild(MatDrawer) public readonly sidebar: MatDrawer;

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    this.subscribeEnterXSmallBreakpoint();
    this.subscribeLeaveXSmallBreakpoint();
    this.setToggleSidebarSubscription();
  }

  private subscribeLeaveXSmallBreakpoint() {
    this.xSmallMediaQuery$
      .pipe(
        takeWhile(() => this.isAlive),
        filter(result => !result.matches)
      )
      .subscribe(() => {
        this.sidebar.mode = 'side';
        this.sidebar.disableClose = true;
      });
  }

  public get inXSmall$(): Observable<Boolean> {
    return this.xSmallMediaQuery$.pipe(map(result => result.matches));
  }

  private subscribeEnterXSmallBreakpoint() {
    this.xSmallMediaQuery$
      .pipe(
        takeWhile(() => this.isAlive),
        filter(result => result.matches)
      )
      .subscribe(() => {
        this.sidebar.mode = 'over';
        this.sidebar.disableClose = false;
      });
  }

  private setToggleSidebarSubscription() {
    this.sidebar.openedChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(open => {
        this.sidebarOpen = open;
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
