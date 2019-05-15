import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EditableInlineTagListComponent } from './editable-inline-tag-list.component';

describe('EditableInlineTagListComponent', () => {
  let component: EditableInlineTagListComponent;
  let fixture: ComponentFixture<EditableInlineTagListComponent>;

  let mockData: {
    titleText: string;
    items: { text: string; count?: number; editable?: any; data?: any }[];
    showIcon: boolean;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableInlineTagListComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableInlineTagListComponent);
    component = fixture.componentInstance;

    mockData = {
      titleText: 'title-text',
      items: [
        { text: 'item-one' },
        { text: 'item-two', count: 12 },
        { text: 'item-three', count: 44, editable: 4 }
      ],
      showIcon: true
    };

    component.titleText = mockData.titleText;
    component.items = mockData.items;
    component.editable = mockData.showIcon;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the correct title text', () => {
    const title = fixture.debugElement.query(
      By.css('.ui_editable-inline-tag-list__title')
    ).nativeElement.textContent;
    expect(title).toContain(mockData.titleText);
  });
  it('should show the correct number of list items', () => {
    const listItemCollection = fixture.debugElement.queryAll(
      By.css('.ui_editable-inline-tag-list__items__item')
    );
    expect(listItemCollection.length).toBe(3);
  });
  it('should show the correct number of list items with counts', () => {
    const listItemCollection = fixture.debugElement.queryAll(
      By.css('.ui_editable-inline-tag-list__items__item__text__count')
    );
    expect(listItemCollection.length).toBe(2);
  });
  it('should show the correct number of list items with icon', () => {
    const listItemCollection = fixture.debugElement.queryAll(
      By.css('.ui_editable-inline-tag-list__items__item__icon')
    );
    expect(listItemCollection.length).toBe(1);
  });
  it('should show the correct labels for the items', () => {
    const listItems = fixture.debugElement.queryAll(
      By.css('.ui_editable-inline-tag-list__items__item__text')
    );
    for (let i = 0; i < listItems.length; i++) {
      const elementText = listItems[i].nativeElement.textContent;
      expect(elementText).toContain(mockData.items[i].text);
    }
  });
  it('should show the count if there is one', () => {
    const listItemCounts = fixture.debugElement.queryAll(
      By.css('.ui_editable-inline-tag-list__items__item__text__count')
    );
    for (let i = 0; i < listItemCounts.length; i++) {
      const countElement = listItemCounts[i].nativeElement.textContent;
      expect(countElement).toContain('(' + mockData.items[i + 1].count + ')');
    }
  });
  it('should show the icon', () => {
    const icon = fixture.debugElement.query(
      By.css('.ui_editable-inline-tag-list__icons__icon')
    );
    expect(icon).toBeTruthy();
  });
  it('should not show the icon if boolean is false', () => {
    component.editable = false;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(
      By.css('.ui_editable-inline-tag-list__icon')
    );
    expect(icon).toBeFalsy();
  });
  it('should trigger icon event when icon is clicked', () => {
    let clicked: boolean;
    component.editClicked.subscribe((e: boolean) => (clicked = e));
    fixture.debugElement
      .query(By.css('.ui_editable-inline-tag-list__icons__icon'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(clicked).toBe(true);
  });
  it('should trigger itemIcon event when one is clicked', () => {
    let editable: any;
    component.itemRemoveClicked.subscribe((e: any) => (editable = e));
    fixture.debugElement
      .query(By.css('.ui_editable-inline-tag-list__items__item__icon'))
      .triggerEventHandler('click', null);
    expect(editable).toBe(mockData.items[2]);
  });
});
