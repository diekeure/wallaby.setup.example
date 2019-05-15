import { BreakpointObserver } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { UiModule } from '../ui.module';
import { BannerComponent } from './banner.component';

interface Action {
  type: string;
}

describe('BannerComponent', () => {
  let component: BannerComponent<Action>;
  let fixture: ComponentFixture<BannerComponent<Action>>;
  const breakpointStream: Subject<{ matches: boolean }> = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, MatIconModule],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: jest.fn().mockReturnValue(breakpointStream) }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<BannerComponent<Action>>(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have buttons', () => {
    component.actions = [
      {
        title: 'klik hier',
        userAction: {
          type: 'test'
        }
      }
    ];
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('campus-button'));
    expect(button.nativeElement.textContent).toContain('klik hier');
  });

  it('should dispatch clicks', () => {
    const bannerAction = {
      title: 'klik hier',
      userAction: {
        type: 'test'
      }
    };
    component.id = 'id1';
    component.actions = [bannerAction];
    fixture.detectChanges();
    let event;
    const button = fixture.debugElement.query(By.css('campus-button'));
    component.afterDismiss.subscribe(a => {
      event = a;
    });
    button.triggerEventHandler('click', null);
    expect(button.nativeElement.textContent).toContain('klik hier');
    expect(event).toEqual({
      action: bannerAction.userAction,
      feedbackId: component.id
    });
  });

  it('should add the --mobile class when the screen width is small', () => {
    const isMobileBreakpoint = true;

    // matches breakpoint
    breakpointStream.next({ matches: isMobileBreakpoint });
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.classList).toContain(
      'ui-banner--mobile'
    );

    // doesn't match breakpoint
    breakpointStream.next({ matches: !isMobileBreakpoint });
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.classList).not.toContain(
      'ui-banner--mobile'
    );
  });
});
