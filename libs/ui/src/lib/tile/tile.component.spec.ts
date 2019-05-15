import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { UtilsModule } from '@campus/utils';
import { TileComponent, TileSecondaryActionInterface } from './tile.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;
  let mockData: {
    icon: string;
    label: string;
    color: string;
    secondaryActions: TileSecondaryActionInterface[];
  };
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TileComponent],
      imports: [RouterTestingModule, MatIconModule, UtilsModule],
      providers: [
        { provide: MatIconRegistry, useClass: MockMatIconRegistry },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;

    mockData = {
      label: 'Maths',
      icon: 'test-icon',
      color: 'blue',
      secondaryActions: [
        {
          label: 'View',
          icon: 'view-icon',
          onClick: (event: Event) => {}
        }
      ]
    };

    component.label = mockData.label;
    component.icon = mockData.icon;
    component.color = mockData.color;
    component.secondaryActions = mockData.secondaryActions;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the content icon if provided', () => {
    let icon = fixture.debugElement.query(By.css('.ui-tile__content__icon'));
    expect(icon).toBeTruthy();

    fixture.componentInstance.icon = null;
    fixture.detectChanges();

    icon = fixture.debugElement.query(By.css('.ui-tile__content__icon'));
    expect(icon).toBeFalsy();
  });

  it('should set the right content icon', () => {
    const icon = fixture.debugElement.query(By.css('.ui-tile__content__icon'))
      .componentInstance.svgIcon;

    expect(icon).toBe(mockData.icon);
  });

  it('should populate the content label with label text value', () => {
    const labelText = fixture.debugElement.query(
      By.css('.ui-tile__content__label')
    ).nativeElement.textContent;

    expect(labelText).toBe(mockData.label);
  });

  it('should change the tile color if color is set', () => {
    const bgcolor = fixture.debugElement.query(By.css('.ui-tile')).nativeElement
      .style['background-color'];

    expect(bgcolor).toBe(mockData.color);
  });

  it('should show the secondary actions', () => {
    let i = 0;

    fixture.debugElement
      .queryAll(By.css('.ui-tile__actions__action__label'))
      .map(el => el.nativeElement)
      .forEach(el => {
        expect(el.textContent).toBe(mockData.secondaryActions[i].label);
        i++;
      });

    expect(i).toBe(mockData.secondaryActions.length);
  });

  it('should show the secondary action icon if provided', () => {
    let i = 0;

    fixture.debugElement
      .queryAll(By.css('.ui-tile__actions__action__icon'))
      .map(el => el.componentInstance.svgIcon)
      .forEach(el => {
        expect(el).toBe(mockData.secondaryActions[i].icon);
        i++;
      });

    expect(i).toBe(mockData.secondaryActions.length);
  });

  it('should not bubble a secondary action click to the main component', async(() => {
    const componentClick = jest.fn();
    const actionClick = jest.fn();

    fixture.debugElement.nativeElement.addEventListener(
      'click',
      componentClick
    );
    component.secondaryActions[0].onClick = actionClick;
    fixture.detectChanges();

    fixture.debugElement
      .queryAll(By.css('.ui-tile__actions__action'))[0]
      .nativeElement.click();

    expect(componentClick.mock.calls.length).toBe(0);
    expect(actionClick.mock.calls.length).toBe(1);
  }));

  it('should execute the secondary action', async(() => {
    const actionClick = jest.fn();

    component.secondaryActions[0].onClick = actionClick;
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.ui-tile__actions__action'))
      .nativeElement.click();

    expect(actionClick.mock.calls.length).toBe(1);
  }));

  it('should navigate', async(() => {
    component.secondaryActions = [
      {
        label: 'View',
        icon: 'view-icon',
        routerLink: ['/foo']
      }
    ];
    fixture.detectChanges();

    fixture.debugElement
      .queryAll(By.css('.ui-tile__actions__action'))[0]
      .nativeElement.click();

    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/foo']);
  }));
});
