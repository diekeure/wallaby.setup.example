import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModule } from '@campus/ui';
import { ButtonComponent } from '../button.component';
import { BorderDirective } from './button-border.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <campus-button bordered>tekst</campus-button>
  `
})
export class TestContainerComponent {}

@NgModule({
  declarations: [TestContainerComponent],
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent]
})
export class TestModule {}

describe('BorderDirective', () => {
  let directive: BorderDirective;
  let component: ButtonComponent;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let componentDE: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
  }));

  beforeEach(() => {
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    componentDE = testContainerFixture.debugElement.query(
      By.css('campus-button')
    );
    component = <ButtonComponent>componentDE.componentInstance;
    testContainerFixture.detectChanges();
    directive = componentDE.injector.get(BorderDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should apply the correct class', () => {
    expect(componentDE.nativeElement.classList).toContain(
      'ui-button--bordered'
    );
  });
});
