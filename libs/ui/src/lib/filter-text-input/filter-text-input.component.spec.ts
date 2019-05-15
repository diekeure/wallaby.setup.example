import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { UiModule } from '@campus/ui';
import { FilterTextInputComponent } from './filter-text-input.component';

describe('FilterTextInputComponent', () => {
  let component: FilterTextInputComponent<any, any>;
  let fixture: ComponentFixture<FilterTextInputComponent<any, any>>;

  const mockData = {
    source: [{ name: 'foo' }, { name: 'bar' }],
    filterFn: (source: any[], filterText: string): any[] => {
      return source.filter(s => s.name.includes(filterText));
    },
    placeHolder: 'foo',
    text: 'foo'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UiModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTextInputComponent);
    component = fixture.componentInstance;
    component.source = mockData.source;
    component.setFilterableItem({ filterFn: mockData.filterFn });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change input value text', () => {
    component.setValue(mockData.text);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui-filter-text-input__input')
    ).nativeElement;
    expect(input.value).toEqual(mockData.text);
  });

  it('should show clear button (displayed with css)', () => {
    component.setValue(mockData.text);
    fixture.detectChanges();
    const inputNotEmpty = fixture.debugElement.query(
      By.css('.ui-filter-text-input__input--not-empty')
    );
    expect(inputNotEmpty).toBeTruthy();
  });

  it('should hide clear button (hidden with css)', () => {
    component.setValue(mockData.text);
    fixture.detectChanges();
    component.setValue('');
    fixture.detectChanges();
    const inputNotEmpty = fixture.debugElement.query(
      By.css('.ui-filter-text-input__input--not-empty')
    );
    expect(inputNotEmpty).toBeNull();
  });

  it('clicking clear button should clear the input field', () => {
    component.setValue(mockData.text);
    fixture.detectChanges();
    const cancel = fixture.debugElement.query(
      By.css('.ui-filter-text-input__cancel')
    );
    cancel.triggerEventHandler('click', null);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('.ui-filter-text-input__input')
    ).nativeElement;
    expect(input.value).toEqual('');
  });

  it('should return filtered source by text in result$', async(() => {
    let result;
    component.result$.subscribe((r: any[]) => (result = r));
    component.setValue(mockData.text);
    fixture.detectChanges();
    expect(result).toEqual([{ name: 'foo' }]);
  }));
});
