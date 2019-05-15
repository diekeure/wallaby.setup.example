import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModule } from '../ui.module';
import { ListFormat } from './enums/list-format.enum';
import { ListViewItemInterface } from './interfaces/list-view-item';
import {
  ListViewComponent,
  ListViewItemDirective
} from './list-view.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-container',
  template: `
    <campus-list-view>
      <div campusListItem>test1</div> <div campusListItem>test2</div>
      <div campusListItem>test3</div> <div campusListItem>test4</div>
      <div campusListItem
        ><img src="https://www.polpo.be/assets/images/polpo.svg"
      /></div>
      <div campusListItem
        ><img src="https://www.polpo.be/assets/images/home-laptop-books.jpg"
      /></div>
      <div campusListItem [selectable]="false">test not selectable</div>
    </campus-list-view>
  `
})
export class TestContainerComponent {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'empty-test-container',
  template: `
    <campus-list-view> </campus-list-view>
  `
})
export class EmptyTestContainerComponent {}

@NgModule({
  declarations: [TestContainerComponent, EmptyTestContainerComponent],
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent, EmptyTestContainerComponent]
})
export class TestModule {}

describe('ListViewComponent', () => {
  let component: ListViewComponent<any>;
  let fixture: ComponentFixture<ListViewComponent<any>>;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let componentDE: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ListViewComponent, ListViewItemInterface]
    });
  }));

  beforeEach(() => {
    // regular component
    fixture = TestBed.createComponent(ListViewComponent);
    fixture.detectChanges();

    // templated component
    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    component = <ListViewComponent<any>>(
      testContainerFixture.debugElement.query(By.css('campus-list-view'))
        .componentInstance
    );
    testContainerFixture.detectChanges();

    componentDE = testContainerFixture.debugElement.query(
      By.css('campus-list-view')
    );
  });

  it('should create', () => {
    expect(testContainerComponent).toBeTruthy();
  });

  it('should create innerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should find projected content as children', () => {
    expect(component.items.length).toBe(7);
  });

  it('should show the text placeholder if without content', () => {
    let emptyTestContainerFixture: ComponentFixture<
      EmptyTestContainerComponent
    >;
    let emptyTestContainerComponent: EmptyTestContainerComponent;

    emptyTestContainerFixture = TestBed.createComponent(
      EmptyTestContainerComponent
    );
    emptyTestContainerComponent = emptyTestContainerFixture.componentInstance;

    component = <ListViewComponent<any>>(
      emptyTestContainerFixture.debugElement.query(By.css('campus-list-view'))
        .componentInstance
    );
    emptyTestContainerFixture.detectChanges();

    componentDE = emptyTestContainerFixture.debugElement.query(
      By.css('campus-list-view')
    );

    expect(componentDE.nativeElement.textContent).toContain(
      component.placeHolderText
    );
  });

  it('should apply the flex-grid class', () => {
    component.listFormat = ListFormat.GRID;
    testContainerFixture.detectChanges();
    fixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));

    expect(itemListDE.nativeElement.className).toContain(
      'ui-list-view__list--grid'
    );
    expect(itemListDE.nativeElement.className).not.toContain(
      'ui-list-view__list--line'
    );
  });

  it('should apply the flex-line class', () => {
    component.listFormat = ListFormat.LINE;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));

    expect(itemListDE.nativeElement.className).toContain(
      'ui-list-view__list--line'
    );
    expect(itemListDE.nativeElement.className).not.toContain(
      'ui-list-view__list--grid'
    );
  });

  it('should select only 1 item', () => {
    component.multiSelect = false;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(By.css('[campusListItem]'));

    const childComponent1EL = itemDEList[0].nativeElement;
    const childComponent2EL = itemDEList[1].nativeElement;

    childComponent1EL.click();
    childComponent2EL.click();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(1);
  });

  it('should not select item with selectable=false attribute', () => {
    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(
      By.css('[campusListItem][ng-reflect-selectable]')
    );

    const childComponentEL = itemDEList[0].nativeElement;

    childComponentEL.click();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(0);
  });

  it('should select multiple items', () => {
    component.multiSelect = true;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(By.css('[campusListItem]'));

    const childComponent1EL = itemDEList[0].nativeElement;
    const childComponent2EL = itemDEList[1].nativeElement;

    childComponent1EL.click();
    childComponent2EL.click();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(2);
  });

  it('should deselect an item', () => {
    component.multiSelect = true;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(By.css('[campusListItem]'));

    const childComponent1EL = itemDEList[0].nativeElement;
    const childComponent2EL = itemDEList[1].nativeElement;

    childComponent1EL.click();
    childComponent2EL.click();
    childComponent1EL.click();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(1);
  });

  it('should select all items', () => {
    component.multiSelect = true;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(By.css('[campusListItem]'));

    const childComponent1EL = itemDEList[0].nativeElement;
    const childComponent2EL = itemDEList[1].nativeElement;

    childComponent1EL.click();
    childComponent2EL.click();
    component.selectAllItems();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(component.items.length);
  });

  it('should deselect all items', () => {
    component.multiSelect = true;
    testContainerFixture.detectChanges();

    const itemListDE = componentDE.query(By.css('.ui-list-view__list'));
    const itemDEList = itemListDE.queryAll(By.css('[campusListItem]'));

    const childComponent1EL = itemDEList[0].nativeElement;
    const childComponent2EL = itemDEList[1].nativeElement;

    childComponent1EL.click();
    childComponent2EL.click();
    component.deselectAllItems();

    const selectedItems = component.items.filter(i => i.isSelected);

    expect(selectedItems.length).toBe(0);
  });

  describe('dynamically created list items', () => {
    // stubbed class for dynamically created items
    class DynamicItemClass extends ListViewItemDirective<any>
      implements ListViewItemInterface {
      listFormat: ListFormat;
    }

    let mockCreatedItem: DynamicItemClass;
    beforeEach(() => {
      mockCreatedItem = new DynamicItemClass(component, null);
      mockCreatedItem.itemHost = mockCreatedItem;
    });

    describe('addItems', () => {
      it("should add the items to the item's querylist", () => {
        const origLength = component.items.length;

        component.addItem(mockCreatedItem);
        expect(component.items.length).toBe(origLength + 1);
      });

      it("should subscribe to the item's selection event", () => {
        // double check that there are no subscribers by default
        expect(mockCreatedItem.itemSelectionChanged.observers.length).toBe(0);

        component.addItem(mockCreatedItem);
        expect(mockCreatedItem.itemSelectionChanged.observers.length).toBe(1);
      });
    });

    describe('resetItems', () => {
      it("should remove the items from the item's querylist", () => {
        // add an item first
        component.addItem(mockCreatedItem);
        const origLength = component.items.length;

        component.resetItems();
        expect(component.items.length).toBe(origLength - 1);
      });

      it("should unsubscribe from the item's selection event", () => {
        // add an item first
        component.addItem(mockCreatedItem);

        component.resetItems();
        expect(mockCreatedItem.itemSelectionChanged.observers.length).toBe(0);
      });
    });
  });
});

/*
 * Testing an Angular directive
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#pipes
 */

@Component({
  selector: 'campus-list-view-item',
  template: `
    <div>Container content</div>
  `,
  providers: [
    {
      provide: ListViewItemInterface,
      useExisting: HostComponent
    }
  ]
})
export class HostComponent implements ListViewItemInterface {
  listFormat: ListFormat;
}

@Component({
  selector: 'campus-list',
  template: `
    <ng-content></ng-content>
  `,
  providers: [
    {
      provide: ListViewComponent,
      useClass: ListComponent
    }
  ]
})
export class ListComponent {}

@Component({
  selector: 'campus-directive-container',
  template: `
    <campus-list-view>
      <campus-list-view-item campusListItem></campus-list-view-item>
    </campus-list-view>
  `
})
export class ContainerComponent {}

@NgModule({
  declarations: [ContainerComponent, HostComponent, ListComponent],
  imports: [CommonModule, UiModule]
})
export class TestModuleForDirective {}

describe('ListItemDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let comp: ContainerComponent;
  let compDE: DebugElement;
  let dir: ListViewItemDirective<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModuleForDirective],
      providers: [ListViewComponent, ListViewItemInterface]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ContainerComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();

      compDE = fixture.debugElement.query(By.css('[campusListItem]'));
      dir = compDE.injector.get(ListViewItemDirective);
    });
  }));

  it('should create the host with the directive attached', () => {
    expect(compDE).not.toBeNull();
    expect(dir).not.toBeNull();
  });

  it('should apply the .item-selected class', () => {
    dir.isSelected = true;
    fixture.detectChanges();

    expect(compDE.nativeElement.classList).toContain(
      'ui-list-view__list__item--selected'
    );
  });

  it('should apply the .item-notselectable', () => {
    dir.selectable = false;
    fixture.detectChanges();

    expect(compDE.nativeElement.classList).toContain(
      'ui-list-view__list__item--notselectable'
    );
  });

  it('should handle te host click event', () => {
    const isSelected = dir.isSelected;
    compDE.nativeElement.click();
    fixture.detectChanges();

    expect(dir.isSelected).toBe(!isSelected);
  });
});
