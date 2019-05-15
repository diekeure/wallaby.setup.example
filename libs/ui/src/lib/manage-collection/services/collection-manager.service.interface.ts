import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageCollectionItemInterface } from '../../manage-collection/interfaces/manage-collection-item.interface';
import { ItemToggledInCollectionInterface } from '../interfaces/item-toggled-in-collection.interface';

export const COLLECTION_MANAGER_SERVICE_TOKEN = new InjectionToken(
  'CollectionManagerService'
);

export interface CollectionManagerServiceInterface {
  manageCollections(
    title: string,
    item: ManageCollectionItemInterface,
    linkableItems: ManageCollectionItemInterface[],
    linkedItemIds: number[],
    recentItemIds: number[]
  ): Observable<ItemToggledInCollectionInterface>;
}
