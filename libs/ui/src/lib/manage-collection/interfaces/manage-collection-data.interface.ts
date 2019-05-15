import { ManageCollectionItemInterface } from './manage-collection-item.interface';

export interface ManageCollectionsDataInterface {
  title: string;
  item: ManageCollectionItemInterface;
  linkableItems: ManageCollectionItemInterface[];
  linkedItemIds: Set<number>;
  recentItemIds: Set<number>;
}
