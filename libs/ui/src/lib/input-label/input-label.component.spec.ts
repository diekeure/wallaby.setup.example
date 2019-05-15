import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputLabelComponent } from './input-label.component';

describe('InputLabelComponent', () => {
  let component: InputLabelComponent;
  let fixture: ComponentFixture<InputLabelComponent>;

  let mockData: { titleText: string; text: string; editable?: boolean };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputLabelComponent],
      imports: [ReactiveFormsModule, FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLabelComponent);
    component = fixture.componentInstance;

    mockData = { titleText: 'the-title', text: 'the-text', editable: true };

    component.titleText = mockData.titleText;
    component.text = mockData.text;
    component.editable = mockData.editable;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the title', () => {
    const title = fixture.debugElement.query(By.css('.ui_input-label__title'))
      .nativeElement.textContent;
    expect(title).toContain(mockData.titleText);
  });
  it('should show the text label', () => {
    const title = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__label')
    ).nativeElement.textContent;
    expect(title).toContain(mockData.text);
  });
  it('shoul not show the text label if the edit button was clicked', () => {
    fixture.debugElement
      .query(By.css('.ui_input-label__text__label-holder__edit-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    const title = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__label')
    );
    expect(title).toBeFalsy();
  });
  it('should show the edit button', () => {
    const editIcon = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__edit-icon')
    );
    expect(editIcon).toBeTruthy();
  });
  it('should not show the input if the edit icon is not clicked', () => {
    const input = fixture.debugElement.query(
      By.css('.ui_input-label__input-holder__input')
    );
    expect(input).toBeFalsy();
  });
  it('should show the input if the edit icon was clicked', () => {
    fixture.debugElement
      .query(By.css('.ui_input-label__text__label-holder__edit-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui_input-label__input-holder__input')
    );
    expect(input).toBeTruthy();
  });
  it('should hide input and show label when canceling edit', () => {
    fixture.debugElement
      .query(By.css('.ui_input-label__text__label-holder__edit-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.ui_input-label__input-holder__icons-holder__cancel-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui_input-label__input-holder__input')
    );
    expect(input).toBeFalsy();
    const label = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__label')
    );
    expect(label).toBeTruthy();
  });
  it('should show the text in the input when editing', () => {
    fixture.debugElement
      .query(By.css('.ui_input-label__text__label-holder__edit-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui_input-label__input-holder__input')
    ).nativeElement;
    expect(input.value).toBe(mockData.text);
  });
  it('should update the label if the input changes', () => {
    let label = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__label')
    ).nativeElement.textContent;
    expect(label).toBe(mockData.text);
    const newText = 'new-text';
    component.text = newText;
    fixture.detectChanges();
    label = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__label')
    ).nativeElement.textContent;
    expect(label).toBe(newText);
  });
  it('should pass the new text when saving', () => {
    let text: string;
    fixture.debugElement
      .query(By.css('.ui_input-label__text__label-holder__edit-icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui_input-label__input-holder__input')
    ).nativeElement;
    input.value = 'new-value';
    input.dispatchEvent(new Event('input'));
    component.saveText.subscribe((e: string) => (text = e));
    fixture.debugElement
      .query(
        By.css('.ui_input-label__input-holder__icons-holder__confirm-icon')
      )
      .triggerEventHandler('click', null);
    expect(text).toBe(input.value);
    expect(text).not.toBe(mockData.text);
  });
  it('should not show the icon if showInput is true', () => {
    component.editable = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(
      By.css('.ui_input-label__text__label-holder__edit-icon')
    );
    expect(icon).toBeFalsy();
  });
});
