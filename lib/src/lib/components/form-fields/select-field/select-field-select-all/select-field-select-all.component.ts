import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPseudoCheckboxModule,
  MatPseudoCheckboxState,
} from '@angular/material/core';
import { FormFieldSelectAll } from '../field-select.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';
import { combineLatest, Observable, startWith } from 'rxjs';
import { SelectFieldService } from '../select-field.service';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'lab900-select-field-select-all',
  standalone: true,
  imports: [CommonModule, MatPseudoCheckboxModule, TranslateModule],
  templateUrl: './select-field-select-all.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldSelectAllComponent {
  @Input({ required: true })
  public selectAll!: FormFieldSelectAll;

  @Output()
  public readonly toggleSelectAll = new EventEmitter<MatPseudoCheckboxState>();

  public readonly selectAllState$: Observable<MatPseudoCheckboxState>;

  public constructor(
    private readonly select: MatSelect,
    private readonly selectService: SelectFieldService<any>
  ) {
    this.selectAllState$ = combineLatest([
      this.select.selectionChange.pipe(
        map((selection) => selection?.value),
        startWith(this.select.selected)
      ),
      this.selectService.selectOptions$,
    ]).pipe(
      map(([selection, selectOptions]) => {
        console.log(selectOptions, selection);
        return selectOptions?.length === selection?.length
          ? 'checked'
          : 'unchecked';
      })
    );
  }

  public toggle(): void {
    if (this.selectAll?.disabled) {
      return;
    }
    this.selectAllState$
      .pipe(take(1), tap(console.log))
      .subscribe((state) => this.toggleSelectAll.emit(state));
  }
}
