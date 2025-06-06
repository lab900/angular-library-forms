import { Component, input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorDirective } from '../../../../models/forms/BaseControlValueAccessor';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-mat-range-slider-field',
  templateUrl: './mat-range-slider-field.component.html',
  styleUrls: ['./mat-range-slider-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatRangeSliderFieldComponent,
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, TranslatePipe],
})
export class MatRangeSliderFieldComponent extends BaseControlValueAccessorDirective<number[]> {
  private latestUnencodedValues?: number[];

  public readonly min = input<number>(0);
  public readonly fromLabel = input<string>('From');
  public readonly toLabel = input<string>('To');
  public readonly steps = input<number | undefined>(undefined);
  public readonly max = input<number>(100);
  public readonly format = input<string>('DEFAULT');

  public writeValue(value: any): void {
    this.value = value ? value : [this.min(), this.max()];
    this.latestUnencodedValues = this.value;
  }

  public updateSliderInstanceValues(key: number, value: any): void {
    if (this.value && this.latestUnencodedValues && value?.[key] !== this.latestUnencodedValues[key]) {
      this.value[key] = value;
      this.latestUnencodedValues = this.value;
      this.onChange(this.value);
    }
  }

  public updateFromValue(event: Event): void {
    const newValue = this.parseValue((event.target as any).value);
    this.updateSliderInstanceValues(0, newValue >= this.min() ? newValue : this.min());
  }

  public updateToValue(event: Event): void {
    const newValue = this.parseValue((event.target as any).value);
    this.updateSliderInstanceValues(1, newValue <= this.max() ? newValue : this.max());
  }

  public parseValue(value: string): number {
    switch (this.format()) {
      case 'K-M':
        value = `${value}`.toLowerCase().replace('k', '000');
        value = value.replace('m', '000000');
        value = value.replace(' ', '');
    }
    return Number(value) || 0;
  }

  public formatValue(value: number): string {
    switch (this.format()) {
      case 'K-M':
        if (Math.abs(value) > 999999) {
          return Math.sign(value) * (Math.abs(value) / 1000000) + ' m';
        } else if (Math.abs(value) > 999) {
          return Math.sign(value) * (Math.abs(value) / 1000) + ' k';
        } else {
          return `${Math.sign(value) * Math.abs(value)}`;
        }
      default:
        return `${value}`;
    }
  }
}
