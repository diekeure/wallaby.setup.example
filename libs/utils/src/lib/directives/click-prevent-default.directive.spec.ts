import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UtilsModule } from '../utils.module';
import { ClickPreventDefaultDirective } from './click-prevent-default.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <div clickPreventDefault> </div>
  `
})
export class TestContainerComponent {
  onClick() {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container-without',
  template: `
    <div> </div>
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

describe('ClickPreventDefaultDirective', () => {
  let directive: ClickPreventDefaultDirective;
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
    componentDE = testContainerFixture.debugElement.query(By.css('div'));
    component = componentDE.componentInstance;
    testContainerFixture.detectChanges();
    directive = componentDE.injector.get(ClickPreventDefaultDirective);
  });

  it('should create the host with the directive attached', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should call preventDefault() on the event', () => {
    const ev = new MouseEvent('click', { bubbles: true });
    spyOn(ev, 'preventDefault');

    componentDE.nativeElement.dispatchEvent(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it("shouldn't call preventDefault() on the event without the directive", () => {
    const ev = new MouseEvent('click', { bubbles: true });
    spyOn(ev, 'preventDefault');

    const testContainerWithoutFixture = TestBed.createComponent(
      TestContainerWithoutDirectiveComponent
    );
    const componentWithoutDE = testContainerWithoutFixture.debugElement.query(
      By.css('div')
    );

    componentWithoutDE.nativeElement.dispatchEvent(ev);
    expect(ev.preventDefault).not.toHaveBeenCalled();
  });
});
