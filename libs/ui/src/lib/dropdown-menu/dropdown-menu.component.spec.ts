import {
  Component,
  NgModule,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { UiModule } from '../ui.module';
import { DropdownMenuComponent } from './dropdown-menu.component';

const mockData = {
  showHeader: false,
  headerIcon: 'test-icon',
  itemType: 'tests',
  newItemCount: '2',
  linkText: 'alle tests',
  linkUrl: '/tests'
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'host-component',
  template: `
    <campus-dropdown-menu>
      <button id="projectedButton">menu</button>
    </campus-dropdown-menu>
  `
})
export class HostComponent implements OnInit {
  @ViewChild(DropdownMenuComponent) dropdown: DropdownMenuComponent;
  constructor() {}

  ngOnInit() {}
}
@NgModule({
  declarations: [HostComponent],
  imports: [RouterTestingModule, NoopAnimationsModule, UiModule],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
})
export class TestModule {}
describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;
  let hostFixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    component.showHeader = mockData.showHeader;
    component.headerIcon = mockData.headerIcon;
    component.itemType = mockData.itemType;
    component.newItemCount = mockData.newItemCount;
    component.linkText = mockData.linkText;
    component.linkUrl = mockData.linkUrl;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should drop down if needed', () => {
    const triggerSpy = jest.spyOn(component['trigger'], 'openMenu');
    // dropdown is not triggered --> should not be present
    expect(
      fixture.debugElement.query(By.css('.ui-dropdown-menu__body'))
    ).toBeFalsy();

    // dropdown is triggered --> should be present
    component.toggle();
    fixture.detectChanges();
    expect(triggerSpy).toHaveBeenCalledTimes(1);
    expect(
      fixture.debugElement.query(By.css('.ui-dropdown-menu__body'))
    ).toBeTruthy();
  });

  it('should not show the header', () => {
    component.toggle();
    fixture.detectChanges();
    const header = fixture.debugElement.query(
      By.css('.ui-dropdown-menu__header')
    );
    expect(header).toBeFalsy();
  });

  describe('dropdown with header', () => {
    beforeEach(() => {
      component.showHeader = true;
      component.toggle();
      fixture.detectChanges();
    });
    it('should show the header', () => {
      const header = fixture.debugElement.query(
        By.css('.ui-dropdown-menu__header')
      );
      expect(header).toBeTruthy();
    });

    it('should show the header icon if provided', () => {
      expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();

      component.headerIcon = '';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h3 .icon'))).toBeFalsy();
    });

    it('should show the text if provided', () => {
      const header = fixture.debugElement.query(
        By.css('.ui-dropdown-menu__header')
      ).nativeElement.textContent;
      expect(header).toContain(
        `${mockData.newItemCount} nieuwe ${mockData.itemType} ${
          mockData.linkText
        }`
      );
    });

    it('should only show the link if both text and url are provided', () => {
      component.linkText = '';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('span a'))).toBeFalsy();

      component.linkText = mockData.linkText;
      component.linkUrl = '';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('span a'))).toBeFalsy();

      component.linkText = mockData.linkText;
      component.linkUrl = mockData.linkUrl;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('span a'))).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('span a')).nativeElement.textContent
      ).toBe(mockData.linkText);
    });
  });

  describe('menu with projected content', () => {
    beforeEach(() => {
      hostFixture = TestBed.createComponent(HostComponent);
      hostComponent = hostFixture.componentInstance;

      hostFixture.detectChanges();
    });
    it('should show the projected content', () => {
      hostComponent.dropdown.toggle();

      const projectedContent = hostFixture.debugElement
        .query(By.directive(DropdownMenuComponent))
        .query(By.css('.ui-dropdown-menu__body #projectedButton'));
      expect(projectedContent).toBeTruthy();
    });
  });
});
