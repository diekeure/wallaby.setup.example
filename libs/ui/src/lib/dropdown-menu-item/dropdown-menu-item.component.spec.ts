import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';

const mockData = {
  header: 'foo',
  link: 'link',
  alt: 'alt',
  image: '/image.png',
  icon: 'icon-brol',
  description: 'foobar'
};

describe('DropdownMenuItemComponent', () => {
  let component: DropdownMenuItemComponent;
  let fixture: ComponentFixture<DropdownMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMenuItemComponent],
      imports: [MatIconModule, RouterTestingModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct header', () => {
    component.header = mockData.header;
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('.ui-dropdown-menu-item__header')
    );
    expect(element.nativeElement.textContent).toBe(mockData.header);
  });

  it('should not show the header if the string is empty', () => {
    component.header = '';
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('.ui-dropdown-menu-item__header')
    );
    expect(element).toBeFalsy();
  });

  it('should not show an image if none is set', () => {
    component.image = '';
    component.imageAltText = mockData.alt;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('img'));
    expect(element).toBeFalsy();
  });

  it('should show an image if set', () => {
    component.image = 'a';
    component.imageAltText = mockData.alt;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('img'));
    expect(element).toBeTruthy();
  });

  it('should not show an icon if none set', () => {
    component.icon = '';
    component.imageAltText = mockData.alt;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-icon'));
    expect(element).toBeFalsy();
  });

  it('should show an icon if set', () => {
    component.icon = 'a';
    component.imageAltText = mockData.alt;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-icon'));
    expect(element).toBeTruthy();
  });

  it('should show neither icon nor image when both are set', () => {
    component.icon = mockData.icon;
    component.image = mockData.image;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('img'));
    expect(element).toBeFalsy();
    element = fixture.debugElement.query(By.css('mat-icon'));
    expect(element).toBeFalsy();
  });

  it('should correct description', () => {
    component.description = mockData.description;
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('.ui-dropdown-menu-item__description')
    );
    expect(element.nativeElement.textContent).toContain(mockData.description);
  });

  it('should correct image alt', () => {
    component.image = mockData.image;
    component.imageAltText = mockData.alt;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('img'));
    expect(element.nativeElement.alt).toBe(mockData.alt);
  });
});
