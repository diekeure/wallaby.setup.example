import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[campusHideDesktop],[hide-desktop]'
})
export class HideDesktopDirective implements OnInit, OnDestroy {
  private isDesktop: boolean;
  private subscriptions = new Subscription();

  constructor(private breakPointObserver: BreakpointObserver) {}

  @HostBinding('style.display')
  get isHidden() {
    return this.isDesktop ? 'none' : '';
  }

  ngOnInit() {
    this.subscriptions.add(
      this.breakPointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(map(result => result.matches))
        .subscribe(result => {
          this.isDesktop = !result;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
