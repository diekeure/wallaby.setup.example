import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatIcon,
  MatIconModule,
  MatIconRegistry,
  MatListModule,
  MatListOption,
  MatSelectionList,
  MAT_DIALOG_DATA
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { FilterServiceInterface, FILTER_SERVICE_TOKEN } from '@campus/utils';
import { ButtonComponent } from '../button/button.component';
import { FilterTextInputComponent } from '../filter-text-input/filter-text-input.component';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { ManageCollectionsDataInterface } from './interfaces/manage-collection-data.interface';
import { ManageCollectionItemInterface } from './interfaces/manage-collection-item.interface';
import { ManageCollectionComponent } from './manage-collection.component';

describe('ManageCollectionComponent', () => {
  let component: ManageCollectionComponent;
  let fixture: ComponentFixture<ManageCollectionComponent>;
  let mockInjectedData: ManageCollectionsDataInterface;
  let mockLinkableItems: ManageCollectionItemInterface[];
  let generalListDE;
  let recentListDE;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ManageCollectionComponent,
        InfoPanelComponent,
        FilterTextInputComponent,
        ButtonComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockInjectedData },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: FILTER_SERVICE_TOKEN,
          useValue: { filter: () => mockInjectedData.linkableItems } // all injected items
        },
        { provide: MatIconRegistry, useClass: MockMatIconRegistry }
      ]
    });
  }));

  beforeAll(() => {
    mockLinkableItems = [
      {
        icon: 'bundle',
        label: 'Link',
        id: 1,
        className: 'itemToLink'
      },
      {
        icon: 'bundle',
        label: 'Toon Link',
        id: 2,
        className: 'itemToLink'
      },
      {
        icon: 'bundle',
        label: 'Dark Link',
        id: 3,
        className: 'itemToLink'
      }
    ];

    mockInjectedData = {
      title: 'Zelda needs some Links',
      item: {
        icon: 'task',
        label: 'Zelda',
        id: 42,
        className: 'itemReceivingLinks'
      },
      linkableItems: mockLinkableItems,
      linkedItemIds: new Set([3]), //selected item ids
      recentItemIds: new Set([1])
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    generalListDE = fixture.debugElement.query(
      By.css('.ui-manage-collection__all-items')
    );
    recentListDE = fixture.debugElement.query(
      By.css('.ui-manage-collection__recent-items')
    );
  });

  describe('creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should inject the MAT_DIALOG_DATA', () => {
      expect(component.data).toEqual(mockInjectedData);
    });
  });

  describe('content', () => {
    it('should show the linkable items from the injected data', () => {
      // map to combination id/label/icon
      const itemsInGeneralList = generalListDE
        .queryAll(By.directive(MatListOption))
        .map(dE => ({
          id: dE.componentInstance.value,
          label: dE.nativeElement.textContent,
          icon: dE.query(By.directive(MatIcon)).componentInstance.svgIcon
        }));

      // map source items to combination id/label/icon
      const mappedLinkableItems = mockLinkableItems.map(item => ({
        id: item.id,
        label: item.label,
        icon: item.icon
      }));

      expect(itemsInGeneralList).toEqual(mappedLinkableItems);
    });
    it('should show the recent linkable items at the top of the list', () => {
      // map to combination id/label/icon
      const itemsInRecentList = recentListDE
        .queryAll(By.directive(MatListOption))
        .map(dE => ({
          id: dE.componentInstance.value,
          label: dE.nativeElement.textContent,
          icon: dE.query(By.directive(MatIcon)).componentInstance.svgIcon
        }));

      const recentLinkableItems = [mockLinkableItems[0]];

      // map source items to combination id/label/icon
      const mappedLinkableItems = recentLinkableItems.map(item => ({
        id: item.id,
        label: item.label,
        icon: item.icon
      }));

      expect(itemsInRecentList).toEqual(mappedLinkableItems);
    });

    it('should not  show the recent linkable items block if there are none', () => {
      component.recentLinkableItems = [];
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('.ui-manage-collection__recent-items')
        )
      ).toBeFalsy();
    });

    describe('filter', () => {
      let filterService: FilterServiceInterface;
      beforeEach(() => {
        filterService = TestBed.get(FILTER_SERVICE_TOKEN);
      });

      it('should filter the items', () => {
        const mockFilteredItems = [mockLinkableItems[0], mockLinkableItems[1]];
        const mockFilteredItemsIds = mockFilteredItems.map(item => item.id);

        filterService.filter = jest.fn().mockReturnValue(mockFilteredItems);
        component.filterTextInput.setValue('some value that does not matter');

        fixture.detectChanges();

        const itemsInListIds = generalListDE
          .queryAll(By.directive(MatListOption))
          .map(dE => dE.componentInstance.value);

        expect(itemsInListIds).toEqual(mockFilteredItemsIds);
      });
      it('should hide the recent items when a filter is active', () => {
        component.filterTextInput.setValue('some value that does not matter');
        fixture.detectChanges();
        expect(
          fixture.debugElement.query(
            By.css('.ui-manage-collection__recent-items')
          )
        ).toBeFalsy();
      });
      it('should init without a filter applied', () => {
        expect(component.filterTextInput.input.value).toBe('');
      });
      it('should keep selection info of a filtered item', () => {
        // doublecheck initial selection
        let itemsInGeneralList = generalListDE.queryAll(
          By.directive(MatListOption)
        );
        expect(itemsInGeneralList[1].componentInstance.selected).toBe(false);
        expect(itemsInGeneralList[2].componentInstance.selected).toBe(true);

        // for completeness, let's select an extra item
        itemsInGeneralList[0].nativeElement.click();
        expect(itemsInGeneralList[0].componentInstance.selected).toBe(true);

        // filter all items away
        const mockFilteredItems = [];
        filterService.filter = jest.fn().mockReturnValue(mockFilteredItems);
        component.filterTextInput.setValue('some value that does not matter');
        fixture.detectChanges();

        // clear filter
        filterService.filter = jest.fn().mockReturnValue(mockLinkableItems);
        component.filterTextInput.clear();
        fixture.detectChanges();

        itemsInGeneralList = generalListDE.queryAll(
          By.directive(MatListOption)
        );
        expect(itemsInGeneralList[0].componentInstance.selected).toBe(true);
        expect(itemsInGeneralList[1].componentInstance.selected).toBe(false);
        expect(itemsInGeneralList[2].componentInstance.selected).toBe(true);

        // item[0] is also a recent item
        const recentItem = recentListDE.query(By.directive(MatListOption))
          .componentInstance;
        expect(recentItem.selected).toBe(true);
      });

      describe('no results', () => {
        beforeEach(() => {
          // filter all items away
          const mockFilteredItems = [];
          filterService.filter = jest.fn().mockReturnValue(mockFilteredItems);
          component.filterTextInput.setValue('some value that does not matter');
          fixture.detectChanges();
        });

        it('should show a message', () => {
          const message = fixture.debugElement
            .query(By.directive(MatSelectionList))
            .query(By.css('span'))
            .nativeElement.textContent.trim();

          const expected = 'Het filteren leverde geen resultaten op.';
          expect(message).toBe(expected);
        });

        it('should show a link to clear the filter', () => {
          const link = fixture.debugElement
            .query(By.directive(MatSelectionList))
            .query(By.css('a')).nativeElement;

          // link text
          const linkText = link.textContent.trim();
          const expectedText = 'Filter verwijderen';
          expect(linkText).toBe(expectedText);

          // link click event
          component.filterTextInput.clear = jest.fn();
          link.click();
          expect(component.filterTextInput.clear).toHaveBeenCalled();
        });
      });
    });
  });

  describe('selection', () => {
    it('should emit a ItemToggledInCollectionEvent on selection change', () => {
      component.selectionChanged.emit = jest.fn();

      const itemsInListDE = generalListDE.queryAll(By.directive(MatListOption));

      itemsInListDE[2].nativeElement.click();

      expect(component.selectionChanged.emit).toHaveBeenCalled();
    });
    it('should select multiple instances of the same item in the list', () => {
      // recent item and 'regular' item
      const itemsInGeneralListDE = generalListDE.queryAll(
        By.directive(MatListOption)
      );
      const itemsInRecentListDE = recentListDE.queryAll(
        By.directive(MatListOption)
      );

      // equal to start with
      const selectedStart = itemsInRecentListDE[0].componentInstance.selected;
      expect(itemsInRecentListDE[0].componentInstance.selected).toBe(
        itemsInGeneralListDE[0].componentInstance.selected
      );

      itemsInGeneralListDE[0].nativeElement.click();
      fixture.detectChanges();

      // equal after selection change
      expect(itemsInRecentListDE[0].componentInstance.selected).toBe(
        itemsInGeneralListDE[0].componentInstance.selected
      );
      // not equal to the previous value
      expect(itemsInRecentListDE[0].componentInstance.selected).not.toBe(
        selectedStart
      );
    });
    it(
      'should not emit multiple ItemToggledInCollectionEvents' +
        ' when selecting multiple instances of an item',
      () => {
        component.selectionChanged.emit = jest.fn();

        const itemsInGeneralListDE = generalListDE.queryAll(
          By.directive(MatListOption)
        );

        // item has a double in recent items, see earlier test
        itemsInGeneralListDE[0].nativeElement.click();
        fixture.detectChanges();

        expect(component.selectionChanged.emit).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe('dialog functionality', () => {
    it('should set the title', () => {
      const dialogTitle = fixture.debugElement
        .query(By.css('[mat-dialog-title]'))
        .nativeElement.textContent.trim();

      expect(dialogTitle).toBe(mockInjectedData.title);
    });
    it('should set the selection list as scrollable content', () => {
      // just testing if the list is inside a <mat-dialog-content>
      // the rest should be handled by Material's unit tests
      const dialogContent = fixture.debugElement.query(
        By.css('mat-dialog-content')
      );
      const selectionList = fixture.debugElement.query(
        By.directive(MatSelectionList)
      );
      expect(selectionList.parent).toBe(dialogContent);
    });
    it('should include a close button', () => {
      // just testing if MatDialogRef.close() is called
      // the rest should be handled by Material's unit tests
      const dialogRef = TestBed.get(MatDialogRef);
      dialogRef.close = jest.fn();

      const button = fixture.debugElement.query(By.directive(ButtonComponent));
      button.triggerEventHandler('click', null);

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
