import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[campusHideMobile], [hide-mobile]'
})
export class HideMobileDirective implements OnInit, OnDestroy {
  private isMobile: boolean;
  private subscriptions = new Subscription();

  constructor(private breakPointObserver: BreakpointObserver) {}

  @HostBinding('style.display')
  get isHidden() {
    return this.isMobile ? 'none' : '';
  }

  ngOnInit() {
    this.subscriptions.add(
      this.breakPointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(map(result => result.matches))
        .subscribe(result => {
          this.isMobile = result;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
