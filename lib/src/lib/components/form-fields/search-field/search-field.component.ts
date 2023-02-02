import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSearch } from './field-search.model';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lab900-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent<T> extends FormComponent<FormFieldSearch<T>> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
  public constructor(translateService: TranslateService) {
    super(translateService);
  }

  public handleAddNew(searchQuery: string): void {
    this.options
      ?.addNewFn(searchQuery)
      .pipe(take(1))
      .subscribe((v) => this.fieldControl.setValue(v));
  }
}
