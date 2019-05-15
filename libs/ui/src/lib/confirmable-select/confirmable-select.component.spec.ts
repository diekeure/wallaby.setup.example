import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockMatIconRegistry } from '@campus/testing';
import { ButtonComponent } from '../button/button.component';
import {
  ConfirmableSelectComponent,
  SelectOption
} from './confirmable-select.component';

describe('ConfirmableSelectComponent', () => {
  let component: ConfirmableSelectComponent;
  let fixture: ComponentFixture<ConfirmableSelectComponent>;

  let mockData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmableSelectComponent, ButtonComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        MatIconModule
      ],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmableSelectComponent);
    component = fixture.componentInstance;

    mockData = {
      label: 'the-title',
      text: 'this is the text for the select',
      options: [
        { value: 'option-one', viewValue: 'Option one' },
        { value: 'option-two', viewValue: 'Option two' }
      ]
    };
    mockData.selectedOption = mockData.options[0].value;

    component.label = mockData.label;
    component.text = mockData.text;
    component.selectedOption = mockData.selectedOption;
    component.options = mockData.options;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not show the save icon when no change was made', () => {
    const icon = fixture.debugElement.query(
      By.css('.ui-confirmable-select__dropdown__icon')
    );
    expect(icon).toBeFalsy();
  });
  it('should show the icon once a change was made to the select', () => {
    component.selectControl.markAsDirty();
    fixture.detectChanges();
    const icon = fixture.debugElement.query(
      By.css('.ui-confirmable-select__dropdown__icon')
    );
    expect(icon).toBeTruthy();
  });
  it('should show the label', () => {
    const label = fixture.debugElement.query(
      By.css('.ui-confirmable-select__label')
    ).nativeElement.textContent;
    expect(label).toBe(mockData.label);
  });
  it('should show the text', () => {
    const text = fixture.debugElement.query(
      By.css('.ui-confirmable-select__text')
    ).nativeElement.textContent;
    expect(text).toBe(mockData.text);
  });
  it('should hide the icon once it is clicked', () => {
    component.selectControl.markAsDirty();
    fixture.detectChanges();
    const icon = fixture.debugElement.query(
      By.css('.ui-confirmable-select__dropdown__icon')
    );
    icon.triggerEventHandler('click', null);
    fixture.detectChanges();
    const icon2 = fixture.debugElement.query(
      By.css('.ui-confirmable-select__dropdown__icon')
    );
    expect(icon2).toBeFalsy();
  });
  it('should emit the selected option', () => {
    component.selectControl.setValue(mockData.options[1].value);
    component.selectControl.markAsDirty();
    fixture.detectChanges();
    let option: SelectOption;
    component.clickConfirm.subscribe((e: SelectOption) => {
      option = e;
    });
    const icon = fixture.debugElement.query(
      By.css('.ui-confirmable-select__dropdown__icon')
    );
    icon.triggerEventHandler('click', null);
    expect(option).toEqual(mockData.options[1]);
  });
});
