import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PersonBadgeComponent } from './person-badge.component';
import { PersonInitialsPipe } from './pipes/person-initials.pipe';

describe('PersonBadgeComponent', () => {
  let component: PersonBadgeComponent;
  let fixture: ComponentFixture<PersonBadgeComponent>;

  let mockData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonBadgeComponent, PersonInitialsPipe]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBadgeComponent);
    component = fixture.componentInstance;

    mockData = {
      align: 'left',
      size: 'medium',
      person: {
        displayName: 'Tom Mertens',
        name: 'Mertens',
        firstName: 'Tom',
        avatar:
          'data:image/jpeg;base64,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'
      },
      subText: 'some placeholder text'
    };

    component.align = mockData.align;
    component.size = mockData.size;
    component.person = mockData.person;
    component.subText = mockData.subText;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add the size class', () => {
    const element = fixture.debugElement.query(
      By.css('.ui_person-badge__badge--' + mockData.size)
    );
    expect(element).toBeTruthy();
  });
  it('should add the align class', () => {
    const element = fixture.debugElement.query(
      By.css('.ui_person-badge--' + mockData.align)
    );
    expect(element).toBeTruthy();
  });
  it('should show the displayName', () => {
    const text = fixture.debugElement.query(
      By.css('.ui_person-badge__display__name')
    ).nativeElement.textContent;
    expect(text).toBe(mockData.person.displayName);
  });
  it('should show the subText', () => {
    const text = fixture.debugElement.query(
      By.css('.ui_person-badge__display__subtext')
    ).nativeElement.textContent;
    expect(text).toBe(mockData.subText);
  });
  it('should show no initials if there is an avatar', () => {
    const badge = fixture.debugElement.query(By.css('.ui_person-badge__badge'))
      .nativeElement.textContent;
    expect(badge.trim()).toBe(''); // somehow a space gets added here
  });
  it('should show initials if there is no avatar', () => {
    component.person = {
      displayName: 'Tom Mertens',
      name: 'Mertens',
      firstName: 'Tom'
    };
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.ui_person-badge__badge'))
      .nativeElement.textContent;
    expect(badge).toContain('MT');
  });
  it('should show the displayName initial if there is no avatar, name nor firstname', () => {
    component.person = {
      displayName: 'Tom Mertens'
    };
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.ui_person-badge__badge'))
      .nativeElement.textContent;
    expect(badge.trim()).toBe('T');
  });

  it('should hide the text', () => {
    component.person = {
      displayName: 'Tom Mertens'
    };
    component.showText = false;
    fixture.detectChanges();
    const badge = fixture.debugElement.query(
      By.css('.ui_person-badge__display')
    );
    expect(badge).toBeNull();
  });
});
