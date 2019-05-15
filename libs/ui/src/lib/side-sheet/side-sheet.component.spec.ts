import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideSheetBodyDirective } from './directives/side-sheet-body.directive';
import { SideSheetHeaderDirective } from './directives/side-sheet-header.directive';
import { SideSheetPageDirective } from './directives/side-sheet-page.directive';
import { SideSheetComponent } from './side-sheet.component';

@Component({
  selector: 'campus-test-host',
  template: `
    <campus-side-sheet [isOpenOnInit]="true">
      <campus-side-sheet-header *ngIf="showHeader"
        >Test header</campus-side-sheet-header
      >
      <campus-side-sheet-body>
        <div><p>Test body</p></div>
      </campus-side-sheet-body>
      <campus-side-sheet-page>
        <div>This is a test page.</div>
      </campus-side-sheet-page>
    </campus-side-sheet>
  `
})
export class TestHostComponent {
  isOpen: boolean;
  showHeader = true;
}

describe('SideSheetComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let sideSheetComp: SideSheetComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatSidenavModule],
      declarations: [
        TestHostComponent,
        SideSheetComponent,
        SideSheetHeaderDirective,
        SideSheetBodyDirective,
        SideSheetPageDirective
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);

    hostComponent = fixture.componentInstance;
    sideSheetComp = <SideSheetComponent>(
      fixture.debugElement.query(By.css('campus-side-sheet')).componentInstance
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should display the header text', () => {
    expect(
      fixture.debugElement.query(By.directive(SideSheetHeaderDirective))
        .nativeElement.textContent
    ).toContain('Test header');
  });

  it('should display the default header text', () => {
    hostComponent.showHeader = false;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.ui-side-sheet__header')).nativeElement
        .textContent
    ).toContain('Info');
  });

  it('should display the body content', () => {
    expect(
      fixture.debugElement
        .query(By.directive(SideSheetBodyDirective))
        .query(By.css('p')).nativeElement.textContent
    ).toBe('Test body');
  });

  it('should display the page content', () => {
    expect(
      fixture.debugElement
        .query(By.directive(SideSheetPageDirective))
        .query(By.css('div')).nativeElement.textContent
    ).toBe('This is a test page.');
  });

  it('should open the drawer by default', () => {
    expect(sideSheetComp.sheet.opened).toBe(true);
  });
});
