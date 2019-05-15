import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ListFormat } from './enums/list-format.enum';
import { ListViewItemInterface } from './interfaces/list-view-item';
/**
 * Places decorated components in a Grid or List layout.
 * List items need to be decorated with the campusListItem attribute.
 *
 * @param {string} listFormat - Show components in a grid or in a line.
 * @param {boolean} multiSelect - Allow selection of multiple components.
 * @param {string} placeHolderText - Text to display when the list is empty.
 *
 * @emits {BehaviorSubject} - A stream of the currently selected items.
 *
 * @export
 * @class ListViewComponent
 */
@Component({
  selector: 'campus-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent<dataObjectType>
  implements AfterContentInit, OnDestroy, OnChanges {
  /**
   * (boolean) - When multiselecting, add a css class to style the selectable items
   *
   * @memberof ListViewComponent
   */
  useItemSelectableOverlayStyle$ = new BehaviorSubject(false);

  public items = new QueryList<ListViewItemDirective<dataObjectType>>();

  private queryListChangesSubscription = new Subscription();
  private itemsSubscription = new Subscription();
  private _manuallyAddedItems = new QueryList<
    ListViewItemDirective<dataObjectType>
  >();

  @Input() listFormat: ListFormat;
  @Input() multiSelect = false;
  @Input() placeHolderText = 'Er zijn geen beschikbare items.';

  @Output() selectedItems$ = new BehaviorSubject<dataObjectType[]>([]);
  @Output() listFormat$ = new BehaviorSubject(this.listFormat);

  // tslint:disable-next-line
  @ContentChildren(forwardRef(() => ListViewItemDirective))
  private _items: QueryList<ListViewItemDirective<dataObjectType>>;

  ngAfterContentInit() {
    // update items list when projected content changes
    this.queryListChangesSubscription.add(
      this._items.changes.subscribe(() => {
        this.onListUpdate();
      })
    );

    // update items list when dynamic content changes
    this.queryListChangesSubscription.add(
      this._manuallyAddedItems.changes.subscribe(() => {
        this.onListUpdate();
      })
    );

    // update item subscriptions when items change
    this.queryListChangesSubscription.add(
      this.items.changes.subscribe(() => {
        this.setupSelectionSubscriptionsForListItems();
      })
    );

    // add the dynamically loaded items to the content projected ones
    this.onListUpdate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listFormat) {
      this.listFormat$.next(this.listFormat);
    }
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.queryListChangesSubscription.unsubscribe();
  }

  public addItem(item: ListViewItemDirective<dataObjectType>) {
    this._manuallyAddedItems.reset([
      ...this._manuallyAddedItems.toArray(),
      item
    ]);
    this._manuallyAddedItems.notifyOnChanges();
  }

  public resetItems() {
    this.deselectAllItems();
    this._manuallyAddedItems.reset([]);
    this._manuallyAddedItems.notifyOnChanges();
  }

  protected onItemSelectionChanged(
    item: ListViewItemDirective<dataObjectType>
  ) {
    if (!this.multiSelect) {
      if (item.isSelected) {
        this.items.filter(i => i !== item).forEach(j => (j.isSelected = false));
      }
    } else {
      this.useItemSelectableOverlayStyle$.next(
        this.items.some(i => i.isSelected)
      );
    }

    this.selectedItems$.next(
      this.items
        .filter(i => i.isSelected)
        .map((i): dataObjectType => i.dataObject)
    );
  }

  public selectAllItems() {
    if (this.multiSelect) {
      this.items.forEach(i => (i.isSelected = true));
    }
  }
  public deselectAllItems() {
    this.items.forEach(i => (i.isSelected = false));
  }

  // merge both querylists
  // + make parentList emit change event
  private onListUpdate(): void {
    this.items.reset([
      ...(this._items ? this._items.toArray() : []), // can be undefined before content init
      ...this._manuallyAddedItems.toArray()
    ]);
    this.items.notifyOnChanges();
  }

  private setupSelectionSubscriptionsForListItems() {
    if (this.itemsSubscription !== null) {
      this.itemsSubscription.unsubscribe();
    }
    this.itemsSubscription = new Subscription();

    this.items.forEach(item => {
      this.itemsSubscription.add(
        item.itemSelectionChanged.subscribe(changedItem =>
          this.onItemSelectionChanged(changedItem)
        )
      );
    });
  }
}

/**
 * Decorator for components in campus-list-view
 * Handles selection, passes format to component.
 *
 * @export
 * @class ListViewItemDirective
 */
@Directive({
  selector: '[campusListItem], [campus-list-item]'
})
export class ListViewItemDirective<dataObjectType>
  implements AfterContentInit, OnDestroy {
  private _isSelected = false;
  public get isSelected(): boolean {
    return this._isSelected;
  }

  public set isSelected(value: boolean) {
    if (value !== this._isSelected) {
      this._isSelected = value;
      this.itemSelectionChanged.emit(this);
    }
  }

  private subscriptions = new Subscription();

  @Input() dataObject: dataObjectType;
  @Input() selectable = true;

  @Output()
  itemSelectionChanged = new EventEmitter<
    ListViewItemDirective<dataObjectType>
  >();

  @HostBinding('class.ui-list-view__list__item--selected')
  get isSelectedClass() {
    return this.isSelected;
  }

  @HostBinding('class.ui-list-view__list__item')
  get isListItemClass() {
    return true;
  }

  @HostBinding('class.ui-list-view__list__item__selectoverlay')
  get useItemSelectableOverlayClass() {
    if (this.parentList)
      return this.parentList.useItemSelectableOverlayStyle$.value;
  }

  @HostBinding('class.ui-list-view__list__item--notselectable')
  get isNotSelectableClass() {
    return !this.selectable;
  }

  @HostListener('click')
  clickEvent() {
    if (this.selectable) {
      this.isSelected = !this.isSelected;
    }
  }

  constructor(
    protected parentList: ListViewComponent<any>,
    public itemHost: ListViewItemInterface
  ) {}

  ngAfterContentInit() {
    if (this.parentList)
      this.subscriptions.add(
        this.parentList.listFormat$.subscribe(
          lf => (this.itemHost.listFormat = lf)
        )
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
