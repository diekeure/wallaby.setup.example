import { ManageCollectionItemInterface } from '../interfaces/manage-collection-item.interface';

export class ManageCollectionItemFixture
  implements ManageCollectionItemInterface {
  icon = 'foo-icon';
  label = 'bar';
  id = 1;
  className = 'foo-class';

  constructor(props: Partial<ManageCollectionItemInterface> = {}) {
    Object.assign(this, props);
  }
}
