import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export enum FilterTextInputTheme {
  light = 'light',
  dark = 'dark'
}

export interface FilterableItem<I, O> {
  filterFn(source: I, filterText: string | number): O[];
}

/**
 * an input field that will output text put into it, will show a clear button when text lenght > 0
 * meant to filter by string.
 *
 * @export
 * @class FilterTextInputComponent
 * @implements {OnDestroy}
 */
@Component({
  selector: 'campus-filter-text-input',
  templateUrl: './filter-text-input.component.html',
  styleUrls: ['./filter-text-input.component.scss']
})
export class FilterTextInputComponent<I, O> {
  public result$: Observable<O[]>;
  public input = new FormControl('');
  private filterableItem: FilterableItem<I, O>;

  @Input() autocomplete = 'on';
  @Input() theme: FilterTextInputTheme;
  @Input() placeholder = 'Filter';
  @Input()
  set source(source: I) {
    this.result$ = this.input.valueChanges.pipe(
      filter(() => !!this.filterableItem),
      startWith(''),
      map(filterText => {
        return this.filterableItem.filterFn(source, filterText);
      })
    );
  }

  /**
   * clears the input value of the textfield
   *
   * @param {string} value
   * @memberof FilterTextInputComponent
   */
  clear(): void {
    this.input.setValue('');
  }

  setValue(filterInput: string): void {
    this.input.setValue(filterInput);
  }

  setFilterableItem(filterableItem: {
    filterFn: (source: I, filterText: string | number) => O[];
  }) {
    this.filterableItem = filterableItem;
  }

  /**
   * enter button is pressed, make sure it returns false to prevent default behavior
   *
   * @returns {boolean}
   * @memberof FilterTextInputViewModel
   */
  onEnterPressed(e: KeyboardEvent): boolean {
    e.preventDefault();
    return false;
  }
}
