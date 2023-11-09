import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldSelectSearch } from '../field-select.model';
import { FormsModule } from '@angular/forms';
import { SelectFieldComponent } from '../select-field.component';

@Component({
  selector: 'lab900-select-field-search',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './select-field-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldSearchComponent<T = any> {
  @Input({ required: true })
  public search!: FormFieldSelectSearch<T>;

  @Input()
  public searchQuery?: string;

  @Input()
  public searching?: boolean;

  @Input()
  public disableScrollToActiveOnOptionsChanged?: boolean;

  @Output()
  public readonly searchQueryChange = new EventEmitter<string>();

  public constructor(
    @Optional() private readonly selectField: SelectFieldComponent<T>
  ) {}

  public handleAddNew(): void {
    this.search.addNewFn(this.searchQuery, this.selectField);
  }
}
