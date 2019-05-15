import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { UiModule } from '../ui.module';
import { ShellLeftDirective } from './directives/shell-left.directive';
import { ShellLogoDirective } from './directives/shell-logo.directive';
import { ShellTopDirective } from './directives/shell-top.directive';
import { ShellComponent } from './shell.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <campus-shell>
      <campus-shell-top>test-top</campus-shell-top>
      <campus-shell-logo>test-logo</campus-shell-logo>
      <campus-shell-left>test-left</campus-shell-left>
      <campus-shell-body><p>Hi there handsome</p></campus-shell-body>
    </campus-shell>
  `
})
export class TestContainerComponent {}

@NgModule({
  declarations: [TestContainerComponent],
  imports: [CommonModule, UiModule, BrowserAnimationsModule],
  exports: [TestContainerComponent],
  providers: [BreakpointObserver]
})
export class TestModule {}

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let innerComponent: ShellComponent;
  const breakpointStream: Subject<{ matches: boolean }> = new Subject();

  beforeEach(async(() => {
    const testbed = TestBed.configureTestingModule({
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    const breakpointObserver: BreakpointObserver = testbed.get(
      BreakpointObserver
    );
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(breakpointStream);
  }));

  beforeEach(() => {
    // regular component
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // templated component
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    innerComponent = <ShellComponent>(
      testContainerFixture.debugElement.query(By.css('campus-shell'))
        .componentInstance
    );
    testContainerFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create innerComponent', () => {
    expect(innerComponent).toBeTruthy();
  });

  it('should project logo content', () => {
    const logo = testContainerFixture.debugElement.query(
      By.directive(ShellLogoDirective)
    ).nativeElement.textContent;
    expect(logo).toBe('test-logo');
  });

  it('should project left content', () => {
    const leftContent = testContainerFixture.debugElement.query(
      By.directive(ShellLeftDirective)
    ).nativeElement.textContent;
    expect(leftContent).toBe('test-left');
  });

  it('should project top content', () => {
    const topContent = testContainerFixture.debugElement.query(
      By.directive(ShellTopDirective)
    ).nativeElement.textContent;
    expect(topContent).toBe('test-top');
  });

  it('should project the rest of the content in the body', () => {
    const bodyContent: HTMLElement = testContainerFixture.debugElement.query(
      By.css('.ui-shell__body')
    ).nativeElement;
    expect(bodyContent.querySelector('p').textContent).toEqual(
      'Hi there handsome'
    );
  });

  it('should alter sidebar behavior on small screen', () => {
    breakpointStream.next({ matches: true });
    expect(fixture.componentInstance.sidebar.mode).toBe('over');
    expect(fixture.componentInstance.sidebar.disableClose).toBe(false);
    breakpointStream.next({ matches: false });
    expect(fixture.componentInstance.sidebar.mode).toBe('side');
    expect(fixture.componentInstance.sidebar.disableClose).toBe(true);
  });

  it('should set the sidebar open', () => {
    component.sidebarOpen = true;
    fixture.detectChanges();
    expect(fixture.componentInstance.sidebar.opened).toBe(true);
  });

  it('should set the sidebar open', () => {
    component.sidebarOpen = false;
    fixture.detectChanges();
    expect(fixture.componentInstance.sidebar.opened).toBe(false);
  });

  it('should trigger the toggled event', () => {
    let ev;
    const sub = component.sidebarToggled.subscribe(event => {
      ev = event;
    });
    component.sidebarOpen = true;
    expect(ev).toBe(true);
    component.sidebarOpen = false;
    expect(ev).toBe(false);
    ev = null;
    component.sidebarOpen = false;
    expect(ev).toBe(null);
    sub.unsubscribe();
  });

  it('subscribes the sidebar opened events', fakeAsync(() => {
    let ev;
    const sub = component.sidebarToggled.subscribe(event => {
      ev = event;
    });
    component.sidebar.toggle();
    fixture.detectChanges();
    flush();
    expect(ev).toBe(false);
    sub.unsubscribe();
  }));
});
