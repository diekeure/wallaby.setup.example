import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModule } from '../../ui.module';
import { ButtonComponent } from '../button.component';
import { PrimaryDirective } from './button-primary.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <campus-button primary>tekst</campus-button>
  `
})
export class TestContainerComponent {}

@NgModule({
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent],
  declarations: [TestContainerComponent]
})
export class TestModule {}

describe('PrimaryDirective', () => {
  let directive: PrimaryDirective;
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
    directive = componentDE.injector.get(PrimaryDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should apply the correct class', () => {
    expect(componentDE.nativeElement.classList).toContain('ui-button--primary');
  });
});
