import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { DropAreaComponent } from './drop-area.component';

describe('DropAreaComponent', () => {
  let component: DropAreaComponent;
  let fixture: ComponentFixture<DropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [DropAreaComponent],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not show the icon container if icon is not given', () => {
    expect(
      fixture.debugElement.query(By.css('.ui-drop-area__icon-container'))
    ).toBeFalsy();
  });
  it('should show the icon container and correct icon if icon is given', () => {
    const icon = 'add';
    component.icon = icon;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.ui-drop-area__icon-container'))
    ).toBeTruthy();
    expect(
      fixture.debugElement
        .query(By.css('mat-icon'))
        .nativeElement.getAttribute('ng-reflect-svg-icon')
    ).toBe(icon);
  });
  it('should show empty label if label is not given', () => {
    expect(
      fixture.debugElement.query(By.css('.ui-drop-area__label')).nativeElement
        .textContent
    ).toBe('');
  });
  it('should show the label if label is given', () => {
    const label = 'this is the label that will be displayed';
    component.label = label;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.ui-drop-area__label')).nativeElement
        .textContent
    ).toBe(label);
  });
  it('should add the dragOverClassName when dragging over', () => {
    component.dragOverClassName = 'some-classname';
    const element = fixture.debugElement.query(By.css('.ui-drop-area'));
    element.nativeElement.dispatchEvent(new Event('dragenter', null));
    fixture.detectChanges();
    expect(component.dragging).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.some-classname'))).toBeTruthy();
    element.nativeElement.dispatchEvent(new Event('dragleave', null));
    fixture.detectChanges();
    expect(component.dragging).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.some-classname'))).toBeFalsy();
  });
  it('should add align justify content left class if forceJustifyContentLeft is true of if both icon and label are set', () => {
    [
      { icon: 'add', label: 'some label', force: false, expected: true },
      { icon: 'add', label: 'some label', force: undefined, expected: true },
      { icon: undefined, label: 'some label', force: false, expected: false },
      { icon: undefined, label: 'some label', force: true, expected: true },
      { icon: 'add', label: undefined, force: false, expected: false },
      { icon: 'add', label: undefined, force: true, expected: true },
      { icon: undefined, label: undefined, force: true, expected: true },
      { icon: undefined, label: undefined, force: false, expected: false },
      { icon: undefined, label: undefined, force: undefined, expected: false }
    ].forEach(value => {
      component.icon = value.icon;
      component.label = value.label;
      component.forceJustifyContentLeft = value.force;
      fixture.detectChanges();
      const element = fixture.debugElement.query(
        By.css('.ui-drop-area--justify-content-left')
      );
      if (value.expected) expect(element).toBeTruthy();
      else expect(element).toBeFalsy();
    });
  });
});
