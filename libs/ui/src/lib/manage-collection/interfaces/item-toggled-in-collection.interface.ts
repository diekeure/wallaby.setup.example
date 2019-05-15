import { ManageCollectionItemInterface } from './manage-collection-item.interface';

export interface ItemToggledInCollectionInterface {
  relatedItem: ManageCollectionItemInterface;
  item: ManageCollectionItemInterface;
  selected: boolean;
}
