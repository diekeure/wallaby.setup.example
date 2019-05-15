import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfoPanelComponent } from './info-panel.component';

describe('InfoPanelComponent', () => {
  let component: InfoPanelComponent;
  let fixture: ComponentFixture<InfoPanelComponent>;

  let mockData: { titleText: string };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPanelComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPanelComponent);
    component = fixture.componentInstance;

    mockData = { titleText: 'the-fancy-title' };

    component.titleText = mockData.titleText;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the title text', () => {
    const title = fixture.debugElement.query(
      By.css('.info-panel__title__left__text')
    ).nativeElement.textContent;
    expect(title).toBe(mockData.titleText);
  });
  it('should show the standard Info title text if no title was given', () => {
    component.titleText = null;
    fixture.detectChanges();
    const title = fixture.debugElement.query(
      By.css('.info-panel__title__left__text')
    ).nativeElement.textContent;
    expect(title).toBe('Info');
  });
  it('should not show the title icon if none was given', () => {
    const icon = fixture.debugElement.query(By.css('.info-panel__title__icon'));
    expect(icon).toBeFalsy();
  });
  it('should show the title icon if one was given', () => {
    component.titleIcon = 'polpo';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(
      By.css('.info-panel__title__left__icon')
    );
    expect(icon).toBeTruthy();
  });
  it('should show the --linked css if titleRightRouterLink input is set', () => {
    component.titleRightRouterLink = ['/settings'];
    fixture.detectChanges();
    const right = fixture.debugElement.query(
      By.css('.info-panel__title__right')
    );
    const rightLinked = fixture.debugElement.query(
      By.css('.info-panel__title__right--linked')
    );
    expect(right).toBeTruthy();
    expect(rightLinked).toBeTruthy();
  });
  it('should not show the --linked css if titleRightRouterLink input is not set', () => {
    fixture.detectChanges();
    const right = fixture.debugElement.query(
      By.css('.info-panel__title__right')
    );
    const rightLinked = fixture.debugElement.query(
      By.css('.info-panel__title__right--linked')
    );
    expect(right).toBeTruthy();
    expect(rightLinked).toBeFalsy();
  });
});
