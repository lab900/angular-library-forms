import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, ValueLabel } from '../../../models/form-field-base';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { SelectFieldComponent } from './select-field.component';
import { ThemePalette } from '@angular/material/core';

/** What the select asks its `selectOptions` function for. Every field is filled in only when it applies. */
export interface FormFieldSelectOptionsFilter {
  /** The page to load, counted from 0. Only sent when `infiniteScroll.enabled` is set. */
  page?: number;
  /** What the user typed in the search box. Only sent when `search.enabled` is set. */
  searchQuery?: string;
  /** Set when "select all" needs the whole list, not only the page that is loaded. */
  getAll?: boolean;
}

/**
 * Loads the options of a select. It may return an array or an `Observable`, and it is called again
 * whenever the filter changes, so the search and the paging can be answered by the server.
 */
export type FormFieldSelectOptionsFn<T> = (
  filter?: FormFieldSelectOptionsFilter,
  fieldControl?: AbstractControl,
  schema?: FormFieldSelect<T>
) => ValueLabel<T>[] | Observable<ValueLabel<T>[]>;

export interface FormFieldSelectOptions<T> extends FormFieldBaseOptions {
  /**
   * Lets more than one option be picked. The control value becomes an array.
   * @default false
   */
  multiple?: boolean;
  /**
   * Renders the picked options as removable chips instead of comma separated text. Needs `multiple`.
   * @default false
   */
  showChipValue?: boolean;
  /**
   * The options to pick from: an array, an `Observable`, or a function of the current filter. Use the
   * function form when the server does the searching or the paging.
   */
  selectOptions?: FormFieldSelectOptionsFn<T> | ValueLabel<T>[] | Observable<ValueLabel<T>[]>;
  /**
   * How a value is matched against an option. **Set this whenever the values are objects**: the
   * default comparison is `===`, so an object that came from the server never equals the one in the
   * options and the select renders empty although the control holds a value.
   *
   * @example
   * compareWith: (a, b) => a?.id === b?.id
   */
  compareWith?: (o1: T, o2: T) => boolean;
  /**
   * Renders the label of an option.
   *
   * @deprecated Labels are set in the selectOptions ValueLabels
   */
  displayOptionFn?: (option: ValueLabel<T>) => string;
  /** Renders the closed select yourself, instead of the label of the picked option. */
  customTriggerFn?: (value: T | undefined) => string;
  /**
   * Picks the only option on its own when the list holds exactly one.
   * @default false
   */
  autoselectOnlyOption?: boolean;
  /**
   * Will show an empty option displaying a message that no options could be found
   * @default false
   */
  noOptionsIndicator?: boolean;
  /**
   * Label to use to display when no options are available
   * noOptionsIndicator needs to be true for this to show
   */
  noOptionsLabel?: string;
  /**
   * The function to display the current value of the select if this item is not present in the select options.
   * @param option Expects the current value of the field, not a ValueLabel!
   */
  displaySelectedOptionFn?: (option: T) => string;
  /** A search box at the top of the option list. */
  search?: {
    enabled: boolean;
    /** A translation key. */
    placeholder?: string;
    /**
     * Label to use to display a not found message based on given search message
     */
    notFoundLabel?: string;
    /** The label of the "add new" button shown when the search finds nothing. A translation key. */
    addNewLabel?: string;
    /**
     * Function to handle the new item creation, can be anything.
     * Use the select argument to update the select after creation
     */
    addNewFn?: (searchQuery: string, select: SelectFieldComponent<T>) => void;
    addNewBtnColor?: ThemePalette;
    /**
     * Clear the search when the select closes
     * @default false
     */
    clearOnClose?: boolean;
    /**
     * The threshold time before firing the search event
     */
    debounceTime?: number;
  };
  /** Loads the options page by page as the user scrolls. The pages come from `selectOptions` as a function. */
  infiniteScroll?: {
    enabled: boolean;
    /**
     * The threshold distance from the bottom of the options list to call the infiniteScroll output event when scrolled.
     * The threshold value can be either in percent, or in pixels.
     * For example, use the value of 10% for the infiniteScroll output event to get called when the user has needs 10% to reach the bottom.
     */
    threshold?: string;
    /**
     * The threshold time before firing the infiniteScroll event
     */
    debounceTime?: number;
  };
  /**
   * Shows a clear button on the right of the field
   */
  clearFieldButton?: {
    enabled: boolean | ((data?: T) => boolean);
    /** Runs instead of clearing the control, when clearing means more than emptying this one field. */
    click?: (fieldControl: AbstractControl, clickEvent: Event) => void;
  };
  /** A "select all" row above the options. Needs `multiple`. */
  selectAll?: {
    enabled: boolean;
    /**
     * A translation key.
     * @default 'forms.select-field.selectAllLabel'
     */
    label?: string;
    disabled?: boolean;
  };
  /** The width of the option panel. Defaults to the width of the field. */
  panelWidth?: string | number | null;
  /** Extra classes on the option panel, for styling options from outside the field. */
  panelClass?: string | string[];
  /**
   * This will only request to select options once the select opens
   * The current value will be the only option until the select is opened
   */
  fetchOptionsOnFocus?: boolean;
}

/**
 * A dropdown, optionally searchable, multi-select and paged. It replaces the deprecated
 * `EditType.Autocomplete`: set `search.enabled` for the same behaviour.
 *
 * With object values always set `compareWith`, or the picked value matches no option and the field
 * looks empty.
 *
 * @example
 * {
 *   attribute: 'country',
 *   title: 'label.country',
 *   editType: EditType.Select,
 *   options: {
 *     selectOptions: filter => this.countryService.search(filter?.searchQuery),
 *     search: { enabled: true, debounceTime: 300 },
 *     compareWith: (a, b) => a?.id === b?.id,
 *     clearFieldButton: { enabled: true },
 *   },
 * }
 */
export interface FormFieldSelect<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldSelectOptions<T>> {
  editType: EditType.Select;
}
