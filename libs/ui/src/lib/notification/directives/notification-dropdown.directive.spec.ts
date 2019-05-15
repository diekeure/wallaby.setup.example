import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../ui.module';
import { NotificationComponent } from './../notification.component';
import { DropdownDirective } from './notification-dropdown.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <campus-notification dropdown>tekst</campus-notification>
  `
})
export class TestContainerComponent {}

@NgModule({
  declarations: [TestContainerComponent],
  imports: [CommonModule, RouterTestingModule, MatIconModule, UiModule],
  exports: [TestContainerComponent]
})
export class TestModule {}

describe('DropdownDirective', () => {
  let directive: DropdownDirective;
  let component: NotificationComponent;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let componentDE: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
  }));

  beforeEach(() => {
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    componentDE = testContainerFixture.debugElement.query(
      By.css('campus-notification')
    );
    component = componentDE.componentInstance;
    testContainerFixture.detectChanges();
    directive = componentDE.injector.get(DropdownDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should apply the correct class', () => {
    expect(componentDE.nativeElement.classList).toContain(
      'ui-notification--dropdown'
    );
  });
});
