import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { LAB900_FORM_MODULE_SETTINGS } from '../../../../models/Lab900FormModuleSettings';
import { ValueLabel } from '../../../../models/form-field-base';
import { LanguagePickerComponent } from '../../../language-picker/language-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'lab900-multi-lang-field-control',
    templateUrl: './multi-lang-field-control.component.html',
    styleUrls: ['./multi-lang-field-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LanguagePickerComponent,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        FormsModule,
    ]
})
export class MultiLangFieldControlComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly appearance =
    inject(LAB900_FORM_MODULE_SETTINGS)?.formField?.appearance ?? 'standard';

  public readonly availableLanguages = input.required<ValueLabel[]>();
  public readonly label = input.required<string>();
  public readonly defaultLanguage = input<string | undefined>();
  public readonly required = input<boolean>(false);
  public readonly readonly = input<boolean>(false);
  public readonly buttonColor = input<ThemePalette>('primary');
  public readonly translateLabel = input<string>('Translate');
  public readonly stopTranslateLabel = input<string>('Stop translating');
  public readonly useTextAreaField = input<boolean>(false);
  public readonly disabled = model<boolean>(false);

  public readonly activeLanguage = signal<ValueLabel | undefined>(undefined);
  public readonly translating = signal<boolean>(false);

  protected value?: Record<string, string>;
  protected globalTranslation?: string;

  public constructor(public readonly control?: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }

    effect(
      () => {
        if (this.availableLanguages()?.length) {
          this.resetDefaultLanguage();
        }
      },
      { allowSignalWrites: true },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public onChange(_: Record<string, string>): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onTouched(_?: any): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public blur(): void {
    this.onTouched();
  }

  public writeValue(value: Record<string, string>): void {
    this.value = value ?? {};
    const valuesArray = Object.values(this.value);
    const hasValues = !!valuesArray.some((v) => !!v);
    this.toggleTranslate(
      hasValues && !valuesArray.every((v) => v === valuesArray[0]),
    );
    this.cdr.markForCheck();
  }

  public toggleTranslate(value: boolean): void {
    this.translating.set(value);
    if (!value) {
      this.globalTranslation = Object.values(this.value).find((v) => !!v);
      this.updateAllToGlobalTranslation();
      this.resetDefaultLanguage();
    }
  }

  public updateGlobalTranslation(value: string): void {
    this.globalTranslation = value;
    if (!this.translating()) {
      this.updateAllToGlobalTranslation();
    }
    this.onTouched();
  }

  public updateSingleLanguage(value: string, lang: string): void {
    this.value = { ...this.value, [lang]: value };
    this.onChange(this.value);
    this.onTouched();
  }

  public resetDefaultLanguage(): void {
    const defaultLang =
      this.availableLanguages().find(
        (l) => l.value === this.defaultLanguage(),
      ) ?? this.availableLanguages()[0];
    this.activeLanguage.set(defaultLang);
  }

  private updateAllToGlobalTranslation(): void {
    this.value = this.availableLanguages()?.reduce(
      (acc, lang) => {
        return { ...acc, [lang.value]: this.globalTranslation };
      },
      {} as Record<string, string>,
    );
    this.onChange(this.value);
  }
}
