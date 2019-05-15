import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UtilsModule } from '../utils.module';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <div (click)="this.onClick()">
      <span clickStopPropagation>tekst</span>
    </div>
  `
})
export class TestContainerComponent {
  onClick() {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container-without',
  template: `
    <div (click)="this.onClick()"> <span>tekst</span> </div>
  `
})
export class TestContainerWithoutDirectiveComponent {
  onClick() {}
}

@NgModule({
  declarations: [
    TestContainerComponent,
    TestContainerWithoutDirectiveComponent
  ],
  imports: [CommonModule, UtilsModule],
  exports: [TestContainerComponent, TestContainerWithoutDirectiveComponent]
})
export class TestModule {}

describe('ClickStopPropagationDirective', () => {
  let directive: ClickStopPropagationDirective;
  let component: Component;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let componentDE: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
  }));

  beforeEach(() => {
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    componentDE = testContainerFixture.debugElement.query(By.css('span'));
    component = componentDE.componentInstance;
    testContainerFixture.detectChanges();
    directive = componentDE.injector.get(ClickStopPropagationDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should call stopPropagation() on the event', () => {
    const ev = new MouseEvent('click', { bubbles: true });
    spyOn(ev, 'stopPropagation');

    componentDE.nativeElement.dispatchEvent(ev);
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it("shouldn't call stopPropagation() on the event without the directive", () => {
    const ev = new MouseEvent('click', { bubbles: true });
    spyOn(ev, 'stopPropagation');

    const testContainerWithoutFixture = TestBed.createComponent(
      TestContainerWithoutDirectiveComponent
    );
    const componentWithoutDE = testContainerWithoutFixture.debugElement.query(
      By.css('span')
    );

    componentWithoutDE.nativeElement.dispatchEvent(ev);
    expect(ev.stopPropagation).not.toHaveBeenCalled();
  });
});
