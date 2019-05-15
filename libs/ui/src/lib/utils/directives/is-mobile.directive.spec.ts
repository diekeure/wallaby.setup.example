import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModule } from '@campus/ui';
import { Subject } from 'rxjs';
import { IsMobileDirective } from './is-mobile.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <div is-mobile>tekst</div>
  `
})
export class TestContainerComponent {}

@NgModule({
  declarations: [TestContainerComponent],
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent],
  providers: [BreakpointObserver]
})
export class TestModule {}

describe('HideMobileDirective', () => {
  let component: Component;
  let directive: IsMobileDirective;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let componentDE: DebugElement;
  const breakpointStream: Subject<{ matches: boolean }> = new Subject();

  beforeEach(async(() => {
    const testbed = TestBed.configureTestingModule({
      imports: [TestModule]
    });
    const breakpointObserver: BreakpointObserver = testbed.get(
      BreakpointObserver
    );
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(breakpointStream);
  }));

  beforeEach(() => {
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    componentDE = testContainerFixture.debugElement.query(By.css('div'));
    component = componentDE.componentInstance;
    testContainerFixture.detectChanges();
    directive = componentDE.injector.get(IsMobileDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should apply the correct attribute based on the BreakpointObserver', () => {
    const isMobileBreakpoint = true;

    breakpointStream.next({ matches: isMobileBreakpoint });
    testContainerFixture.detectChanges();

    expect(componentDE.nativeElement.classList).toContain('ui--mobile');

    breakpointStream.next({ matches: !isMobileBreakpoint });
    testContainerFixture.detectChanges();

    expect(componentDE.nativeElement.classList).not.toContain('ui--mobile');
  });
});
