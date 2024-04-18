import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorDirective } from '../../../../models/forms/BaseControlValueAccessor';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  standalone: true,
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule],
})
export class MatRangeSliderFieldComponent extends BaseControlValueAccessorDirective<
  number[]
> {
  private latestUnencodedValues: number[];

  @Input()
  public formControlName: string;

  @Input()
  public min = 0;

  @Input()
  public fromLabel = 'From';

  @Input()
  public toLabel = 'To';

  @Input()
  public steps?: number;

  @Input()
  public max = 100;

  @Input()
  public format = 'DEFAULT';

  public constructor(private el: ElementRef) {
    super();
  }

  public writeValue(value: any): void {
    this.value = value ? value : [this.min, this.max];
    this.latestUnencodedValues = this.value;
  }

  public updateSliderInstanceValues(key: number, value: number): void {
    if (value[key] !== this.latestUnencodedValues[key]) {
      this.value[key] = value;
      this.latestUnencodedValues = this.value;
      this.onChange(this.value);
    }
  }

  public updateFromValue(event: InputEvent): void {
    const newValue = this.parseValue((event.target as any).value);
    this.updateSliderInstanceValues(
      0,
      newValue >= this.min ? newValue : this.min,
    );
  }

  public updateToValue(event: InputEvent): void {
    const newValue = this.parseValue((event.target as any).value);
    this.updateSliderInstanceValues(
      1,
      newValue <= this.max ? newValue : this.max,
    );
  }

  public parseValue(value: string): number {
    switch (this.format) {
      case 'K-M':
        value = `${value}`.toLowerCase().replace('k', '000');
        value = value.replace('m', '000000');
        value = value.replace(' ', '');
    }
    return Number(value) || 0;
  }

  public formatValue(value: number): string {
    switch (this.format) {
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
