import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MockMatIconRegistry } from '@campus/testing';
import { ButtonComponent } from '../button/button.component';
import {
  BadgePersonInterface,
  PersonBadgeComponent
} from '../person-badge/person-badge.component';
import { PersonInitialsPipe } from '../person-badge/pipes/person-initials.pipe';
import { PersonSummaryComponent } from './person-summary.component';

describe('PersonSummaryComponent', () => {
  let component: PersonSummaryComponent;
  let fixture: ComponentFixture<PersonSummaryComponent>;
  let mockPerson: BadgePersonInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonSummaryComponent,
        ButtonComponent,
        PersonBadgeComponent,
        PersonInitialsPipe
      ],
      imports: [MatIconModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    mockPerson = {
      name: 'mockLastName',
      displayName: 'mockFirstName mockLastName',
      firstName: 'mockFirstName'
    };

    fixture = TestBed.createComponent(PersonSummaryComponent);
    component = fixture.componentInstance;
    component.person = mockPerson;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct name', () => {
    const text = fixture.debugElement.query(
      By.css('.ui-person-summary__text__person-name')
    ).nativeElement.textContent;
    expect(text).toContain(mockPerson.name);
  });

  it('should display correct image url', () => {
    const mockAvatar = 'base64-encode-image';
    component.person.avatar = mockAvatar;
    fixture.detectChanges();
    const image = fixture.debugElement
      .query(By.css('.ui-person-summary__images__picture'))
      .query(By.css('img'));
    expect(image.nativeElement.attributes.src.textContent).toContain(
      mockAvatar
    );
  });

  it('should display correct icon url', () => {
    const icon = 'mockIcon';
    component.connectionTypeIcon = icon;
    fixture.detectChanges();
    const image = fixture.debugElement.query(
      By.css('.ui-person-summary__images__connection-type-icon')
    );
    expect(
      image.nativeElement.attributes['ng-reflect-svg-icon'].textContent
    ).toContain(icon);
  });
});
