import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { UiModule } from '@campus/ui';
import { ButtonComponent } from './button.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <div (click)="this.onClick()"> <campus-button>tekst</campus-button> </div>
  `
})
export class TestContainerComponent {
  onClick() {}
}

@NgModule({
  declarations: [TestContainerComponent],
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent]
})
export class TestModule {}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let componentDE: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    component = <ButtonComponent>(
      testContainerFixture.debugElement.query(By.css('campus-button'))
        .componentInstance
    );
    testContainerFixture.detectChanges();

    componentDE = testContainerFixture.debugElement.query(
      By.css('campus-button')
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldnt show the icon, if not provided', () => {
    const iconDE = componentDE.query(By.css('mat-icon'));

    expect(iconDE).toBeFalsy();
  });

  it('should show the icon, if provided', () => {
    const mockIconClass = 'tasks';

    component.iconClass = mockIconClass;
    testContainerFixture.detectChanges();

    const iconEl = testContainerFixture.debugElement.query(By.css('mat-icon'));

    expect(iconEl).toBeTruthy();
  });

  it('should project the content', () => {
    expect(componentDE.nativeElement.textContent).toContain('tekst');
  });
});
