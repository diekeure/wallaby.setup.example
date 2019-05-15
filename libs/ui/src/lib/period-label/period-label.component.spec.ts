import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PeriodLabelComponent } from './period-label.component';

describe('PeriodLabelComponent', () => {
  let component: PeriodLabelComponent;
  let fixture: ComponentFixture<PeriodLabelComponent>;

  let mockData: {
    titleText: string;
    period: { start: Date; end: Date };
    editable?: boolean;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodLabelComponent],
      imports: [ReactiveFormsModule, FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodLabelComponent);
    component = fixture.componentInstance;

    mockData = {
      titleText: 'some-title',
      period: {
        start: new Date(2018, 0, 1),
        end: new Date(2019, 5, 1)
      },
      editable: true
    };

    component.titleText = mockData.titleText;
    component.period = mockData.period;
    component.editable = mockData.editable;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the title', () => {
    const title = fixture.debugElement.query(By.css('.ui_period-label__title'))
      .nativeElement.textContent;
    expect(title).toBe(mockData.titleText);
  });
  it('should show the start and end date', () => {
    const dates = fixture.debugElement.queryAll(
      By.css('.ui_period-label__date-holder__text')
    );
    const start = dates[0].nativeElement.textContent;
    const end = dates[1].nativeElement.textContent;
    expect(start).toContain('Van 01/01/2018');
    expect(end).toContain('Tot 01/06/2019');
  });
  it('should emit an event when an icon is clicked', () => {
    let startEvent: boolean;
    component.editStart.subscribe((e: boolean) => (startEvent = e));
    let endEvent: boolean;
    component.editEnd.subscribe((e: boolean) => (endEvent = e));
    const dates = fixture.debugElement.queryAll(
      By.css('.ui_period-label__date-holder__icon')
    );
    dates[0].triggerEventHandler('click', null);
    expect(startEvent).toBe(true);
    dates[1].triggerEventHandler('click', null);
    expect(endEvent).toBe(true);
  });
  it('should not show the icons if showIcons is false', () => {
    component.editable = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(
      By.css('.ui_period-label__date-holder__icon')
    );
    expect(icon).toBeFalsy();
  });
});
