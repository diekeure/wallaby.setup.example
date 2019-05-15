import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { hot } from '@nrwl/nx/testing';
import { ManageCollectionItemFixture } from '../fixtures/manage-collection-item.fixture';
import { ItemToggledInCollectionInterface } from '../interfaces/item-toggled-in-collection.interface';
import { ManageCollectionsDataInterface } from '../interfaces/manage-collection-data.interface';
import { ManageCollectionComponent } from '../manage-collection.component';
import { CollectionManagerService } from './collection-manager.service';
import { CollectionManagerServiceInterface } from './collection-manager.service.interface';

const mockData: ManageCollectionsDataInterface = {
  title: 'bar',
  item: new ManageCollectionItemFixture(),
  linkableItems: [
    new ManageCollectionItemFixture({ id: 2 }),
    new ManageCollectionItemFixture({ id: 3 }),
    new ManageCollectionItemFixture({ id: 4 }),
    new ManageCollectionItemFixture({ id: 7 }),
    new ManageCollectionItemFixture({ id: 9 })
  ],
  linkedItemIds: new Set([2, 3, 4]),
  recentItemIds: new Set([2, 7, 9])
};

const mockSelectionChangedData: ItemToggledInCollectionInterface = {
  relatedItem: new ManageCollectionItemFixture({ id: 2 }),
  item: new ManageCollectionItemFixture({ id: 1 }),
  selected: false
};

let mockDataSelectionChanged$: any;
let mockDataAfterclosed$: any;

describe('CollectionManagerService', () => {
  let collectionManagerService: CollectionManagerServiceInterface;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                componentInstance: {
                  selectionChanged: mockDataSelectionChanged$
                },
                afterClosed: () => mockDataAfterclosed$
              };
            }
          }
        }
      ]
    });

    collectionManagerService = TestBed.get(CollectionManagerService);
    matDialog = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    const service: CollectionManagerService = TestBed.get(
      CollectionManagerService
    );
    expect(service).toBeTruthy();
  });

  describe('manageCollection()', () => {
    it('should open a dialog with the ManageCollectionComponent and correct data', () => {
      mockDataSelectionChanged$ = hot('-a-', { a: mockSelectionChangedData });
      mockDataAfterclosed$ = hot('-----a--', { a: 'foo' });

      const openSpy = jest.spyOn(matDialog, 'open');

      collectionManagerService.manageCollections(
        mockData.title,
        mockData.item,
        mockData.linkableItems,
        Array.from(mockData.linkedItemIds),
        Array.from(mockData.recentItemIds)
      );

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(openSpy).toHaveBeenCalledWith(ManageCollectionComponent, {
        data: {
          title: mockData.title,
          item: mockData.item,
          linkableItems: mockData.linkableItems,
          linkedItemIds: mockData.linkedItemIds,
          recentItemIds: mockData.recentItemIds
        }
      });
    });

    it('should bubble the selectionChanged event', () => {
      mockDataSelectionChanged$ = hot('-a-', {
        a: mockSelectionChangedData
      });
      mockDataAfterclosed$ = hot('--------'); // do not trigger close event for this test

      const resultStream$ = collectionManagerService.manageCollections(
        mockData.title,
        mockData.item,
        mockData.linkableItems,
        Array.from(mockData.linkedItemIds),
        Array.from(mockData.recentItemIds)
      );

      expect(resultStream$).toBeObservable(mockDataSelectionChanged$);
    });

    it('should clean up the subscription and stream after closing the dialog', () => {
      // trigger one selectionChanged event (coming from the component rendered in the dialog)
      mockDataSelectionChanged$ = hot('-a-', {
        a: mockSelectionChangedData
      });

      // after selection changed, also trigger an afterClosed event on the dialog
      mockDataAfterclosed$ = hot('---b-'); // trigger close event for this test

      // the output stream should emit one selectionChanged event with data, then complete (because there was an afterClosed event)
      const expectedStream$ = hot('-a-|', { a: mockSelectionChangedData });

      // stream that the manageCollections returns
      const outputStream$ = collectionManagerService.manageCollections(
        mockData.title,
        mockData.item,
        mockData.linkableItems,
        Array.from(mockData.linkedItemIds),
        Array.from(mockData.recentItemIds)
      );

      expect(outputStream$).toBeObservable(expectedStream$);
    });
  });
});
