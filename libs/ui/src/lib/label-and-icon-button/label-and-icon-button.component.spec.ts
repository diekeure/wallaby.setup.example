import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { LabelAndIconButtonComponent } from '../label-and-icon-button/label-and-icon-button.component';

describe('LabelAndIconButtonComponent', () => {
  let component: LabelAndIconButtonComponent;
  let fixture: ComponentFixture<LabelAndIconButtonComponent>;
  let mockData: {
    label: string;
    icon: string;
    iconClass: 'warning' | 'default';
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelAndIconButtonComponent],
      imports: [MatIconModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAndIconButtonComponent);
    component = fixture.componentInstance;

    mockData = {
      label: 'desired text',
      icon: 'given-icon',
      iconClass: 'warning'
    };

    component.label = mockData.label;
    component.icon = mockData.icon;
    component.iconClass = mockData.iconClass;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the actionsText', () => {
    const displayedText = fixture.debugElement.query(
      By.css('.ui_label-and-icon-button__label')
    ).nativeElement.textContent;
    expect(displayedText).toContain(mockData.label);
  });
  it('should show a warning classed icon element', () => {
    const icon = fixture.debugElement.query(By.css('.warning'));
    expect(icon).toBeTruthy();
  });
  it('should not show a default classed icon element', () => {
    const icon = fixture.debugElement.query(By.css('.default'));
    expect(icon).toBeFalsy();
  });
  it('should show the icon in the class for the icon element', () => {
    const icon = fixture.debugElement.query(
      By.css('.ui_label-and-icon-button__icon.given-icon')
    );
    expect(icon).toBeTruthy();
  });
  it('should emit the label when the icon is clicked', () => {
    let emitedText: string;
    component.iconClicked.subscribe((text: string) => (emitedText = text));

    fixture.debugElement
      .query(By.css('.ui_label-and-icon-button__icon'))
      .triggerEventHandler('click', null);
    expect(emitedText).toBe(mockData.label);
  });
});
