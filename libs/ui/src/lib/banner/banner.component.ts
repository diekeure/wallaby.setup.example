import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'campus-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent<T> implements OnDestroy {
  @Input() id: string;
  @Input() message: string;
  @Input() icon: string;
  @Input() actions: BannerAction<T>[];
  @Output() afterDismiss = new EventEmitter<{
    action: T;
    feedbackId: string;
  }>();

  private mobile: boolean;
  private subscriptions: Subscription = new Subscription();

  @HostBinding('class.ui-banner--mobile')
  get isMobile() {
    return this.mobile;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((state: BreakpointState) => (this.mobile = state.matches))
    );
  }

  onAction(action: T) {
    this.afterDismiss.next({ action, feedbackId: this.id });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

export interface BannerAction<T> {
  title: string;
  userAction: T;
}
