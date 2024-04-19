import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ValueLabel } from '../../models/form-field-base';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { TranslateModule } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lab900-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  standalone: true,
  imports: [
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    MatTooltip,
    MatIcon,
  ],
})
export class LanguagePickerComponent {
  @Input()
  public translate = false;

  @Input()
  public value?: Record<string, string>;

  @Output()
  public translateChange = new EventEmitter<boolean>();

  @Input()
  public buttonColor?: ThemePalette;

  @Input()
  public languages: ValueLabel[] = [];

  @Input()
  public activeLanguage: ValueLabel;

  @Output()
  public readonly activeLanguageChange = new EventEmitter<ValueLabel>();

  @Input()
  public translateLabel?: string;

  @Input()
  public stopTranslateLabel?: string;

  public toggleTranslate(): void {
    this.translateChange.emit(!this.translate);
  }
}
