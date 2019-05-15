import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Directive, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[campusIsMobile], [is-mobile]'
})
export class IsMobileDirective implements OnDestroy {
  private mobile: boolean;
  private subscriptions: Subscription = new Subscription();

  @HostBinding('class.ui--mobile')
  get isMobile() {
    return this.mobile;
  }

  @HostBinding('class.ui--desktop')
  get isDesktop() {
    return !this.mobile;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((state: BreakpointState) => (this.mobile = state.matches))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
