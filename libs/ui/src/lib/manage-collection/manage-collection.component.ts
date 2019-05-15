import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  MatDialogRef,
  MatSelectionList,
  MatSelectionListChange,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FilterServiceInterface, FILTER_SERVICE_TOKEN } from '@campus/utils';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FilterTextInputComponent } from '../filter-text-input/filter-text-input.component';
import { ItemToggledInCollectionInterface } from './interfaces/item-toggled-in-collection.interface';
import { ManageCollectionsDataInterface } from './interfaces/manage-collection-data.interface';
import { ManageCollectionItemInterface } from './interfaces/manage-collection-item.interface';

@Component({
  selector: 'campus-manage-collection',
  templateUrl: './manage-collection.component.html',
  styleUrls: ['./manage-collection.component.scss']
})
export class ManageCollectionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public recentLinkableItems: ManageCollectionItemInterface[];

  // needed to selected items after filtering
  private selectedIds: Set<number>;
  private subscriptions = new Subscription();

  @Output() selectionChanged = new EventEmitter<
    ItemToggledInCollectionInterface
  >();

  @ViewChild(MatSelectionList) private selectionList: MatSelectionList;

  @ViewChild(FilterTextInputComponent)
  filterTextInput: FilterTextInputComponent<
    ManageCollectionItemInterface[],
    ManageCollectionItemInterface
  >;

  @HostBinding('class.ui-manage-collection')
  get isManageCollectionClass() {
    return true;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ManageCollectionsDataInterface,
    @Inject(FILTER_SERVICE_TOKEN) private filterService: FilterServiceInterface,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ManageCollectionComponent>
  ) {
    this.recentLinkableItems = data.linkableItems.filter(item =>
      data.recentItemIds.has(item.id)
    );

    this.selectedIds = data.linkedItemIds;
  }

  ngOnInit() {
    this.filterTextInput.setFilterableItem(this);
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      // when options change i.e. after filtering
      // re-set selection
      this.selectionList.options.changes
        .pipe(startWith(null)) // emit once on init
        .subscribe(() => {
          this.selectListItems(this.selectedIds);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onSelectionChanged(event: MatSelectionListChange) {
    const changedItemId = event.option.value;

    if (event.option.selected) {
      this.selectedIds.add(changedItemId);
    } else {
      this.selectedIds.delete(changedItemId);
    }
    // if item appears twice in list
    // also select/deselect other one
    // this does not trigger a new onSelectionChanged
    event.source.options
      .filter(listItem => listItem.value === changedItemId)
      .forEach(listItem => (listItem.selected = event.option.selected));

    // find changed item
    const changedItem = this.data.linkableItems.find(
      item => item.id === changedItemId
    );

    this.selectionChanged.emit({
      item: this.data.item,
      relatedItem: changedItem,
      selected: event.option.selected
    });
  }

  public onCloseButtonClick() {
    this.dialogRef.close();
  }

  filterFn(
    source: ManageCollectionItemInterface[],
    searchText: string
  ): ManageCollectionItemInterface[] {
    const filteredItems = this.filterService.filter(source, {
      label: searchText
    });
    return filteredItems;
  }

  private selectListItems(ids: Set<number>) {
    this.selectionList.options
      .filter(listItem => ids.has(listItem.value))
      .forEach(listItem => (listItem.selected = true));

    this.cd.detectChanges();
  }
}
