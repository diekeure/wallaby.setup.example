import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { UiModule } from '../ui.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let breadcrumbs: DebugElement;

  const mockData = {
    overflowedLinkString: '???',
    maxLen: 3,
    homeIcon: 'homeIconMock',
    seperator: 'seperatorMock',
    homeUrl: 'homeUrlMock',
    breadCrumbs: [
      {
        displayText: 'crumb1',
        link: ['crumb1']
      },
      {
        displayText: 'crumb2',
        link: ['crumb2']
      },
      {
        displayText: 'crumb3',
        link: ['crumb3']
      },
      {
        displayText: 'crumb4',
        link: ['crumb4']
      },
      {
        displayText: 'crumb5',
        link: ['crumb5']
      },
      {
        displayText: 'crumb6',
        link: ['crumb6']
      },
      {
        displayText: 'crumb7',
        link: ['crumb7']
      },
      {
        displayText: 'crumb8',
        link: ['crumb8']
      },
      {
        displayText: 'crumb9',
        link: ['crumb9']
      },
      {
        displayText: 'crumb10',
        link: ['crumb10']
      },
      {
        displayText: 'crumb11',
        link: ['crumb11']
      },
      {
        displayText: 'crumb12',
        link: ['crumb12']
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, RouterTestingModule],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    breadcrumbs = fixture.debugElement.query(By.css('.ui-breadcrumbs__holder'));
    component = fixture.componentInstance;
    component.breadCrumbs = mockData.breadCrumbs;
    component.overflowedLinkString = mockData.overflowedLinkString;
    component.maxLength = mockData.maxLen;
    component.seperator = mockData.seperator;
    component.baseUrl = mockData.homeUrl;
    component.baseIcon = mockData.homeIcon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the home button', () => {
    const homeIconDE = breadcrumbs.query(By.css('[href]'));

    expect(homeIconDE.nativeElement.href).toContain(mockData.homeUrl);
    expect(
      homeIconDE
        .query(By.css('mat-icon'))
        .nativeElement.getAttribute('ng-reflect-svg-icon')
    ).toBe(mockData.homeIcon);
  });

  it('should have 5 children breadcrumbs (home, overflow button and 3 children links', () => {
    expect(
      breadcrumbs.queryAll(By.css('.ui-breadcrumbs__holder__breadcrumbs'))
        .length
    ).toBe(5);
  });

  it('should have 4 children breadcrumbs (home, overflow button, and 2 children links', () => {
    component.maxLength = 2;
    fixture.detectChanges();
    expect(
      breadcrumbs.queryAll(By.css('.ui-breadcrumbs__holder__breadcrumbs'))
        .length
    ).toBe(4);
  });

  it('should display the last item from the array', () => {
    component.maxLength = 1;
    fixture.detectChanges();
    const breadcrumbsArray = breadcrumbs.queryAll(
      By.css('.ui-breadcrumbs__holder__breadcrumbs')
    );
    const lastBreadCrumb = breadcrumbsArray[breadcrumbsArray.length - 1];

    const concatLink = mockData.breadCrumbs[11].link.reduce(
      (acc, url) => (acc += '/' + url),
      ''
    );

    expect(lastBreadCrumb.children.length).toBe(2); // seperator and link

    expect(lastBreadCrumb.query(By.css('a')).nativeElement.href).toContain(
      concatLink
    );
  });

  it('should not display overflow when maxlen is not exceeded', () => {
    component.maxLength = 99;
    component.breadCrumbs = [
      {
        displayText: 'crumb1',
        link: ['crumb1']
      }
    ];
    fixture.detectChanges();
    expect(breadcrumbs.nativeElement.textContent).not.toContain(
      mockData.overflowedLinkString
    );
  });

  it('should display correct overflow string', () => {
    component.maxLength = 1;
    component.breadCrumbs = [
      {
        displayText: 'crumb1',
        link: ['crumb1']
      },
      {
        displayText: 'crumb2',
        link: ['crumb2']
      },
      {
        displayText: 'crumb3',
        link: ['crumb3']
      },
      {
        displayText: 'crumb4',
        link: ['crumb4']
      },
      {
        displayText: 'crumb5',
        link: ['crumb5']
      }
    ];
    fixture.detectChanges();

    expect(
      // first child is home-icon, skipping that one
      // the next <a> should be the overflow-indicator
      breadcrumbs.children[1].query(By.css('a')).nativeElement.textContent
    ).toBe(mockData.overflowedLinkString);
  });
});
