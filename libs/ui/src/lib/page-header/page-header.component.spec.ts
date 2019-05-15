import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { UiModule } from '../ui.module';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  let mockData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;

    // mock data
    mockData = {
      iconClass: 'polpo-wiskunde-lg',
      title: 'Titel',
      subTitle: 'SubTitel'
    };

    // simulate input
    component.iconClass = mockData.iconClass;
    component.title = mockData.title;
    component.subtitle = mockData.subTitle;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the icon', () => {
    const iconEl = fixture.debugElement.query(By.css('mat-icon'));

    expect(iconEl).toBeTruthy();
  });

  it('shouldnt show the icon when the iconclass string is empty', () => {
    component.iconClass = '';
    fixture.detectChanges();

    const iconDE = fixture.debugElement.query(
      By.css('.ui-page-header__icon-wrapper')
    );

    expect(iconDE).toBeNull();
  });

  it('should display the title', () => {
    const TitleDE = fixture.debugElement;

    expect(TitleDE.nativeElement.textContent).toContain(mockData.title);
  });

  it('should display the subtitle', () => {
    const subTitleDE = fixture.debugElement.query(By.css('small'));

    expect(subTitleDE.nativeElement.textContent).toBe(mockData.subTitle);
  });
  it('should not display the subtitle span if the layout is set to centered', () => {
    component.layout = 'centered';
    fixture.detectChanges();
    const subTitleDE = fixture.debugElement.query(By.css('small'));
    expect(subTitleDE).toBeFalsy();
  });
  it('should display the h2 subtitle if the layout is set to centered', () => {
    component.layout = 'centered';
    fixture.detectChanges();
    const subTitleDE = fixture.debugElement.query(By.css('h2'));
    expect(subTitleDE).toBeTruthy();
    expect(subTitleDE.nativeElement.textContent).toBe(mockData.subTitle);
  });
});
