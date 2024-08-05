import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public readonly translating = model<boolean>(false);
  public readonly activeLanguage = model<ValueLabel>();
  public readonly buttonColor = input<ThemePalette>('primary');
  public readonly languages = input.required<ValueLabel[]>();
  public readonly value = input<Record<string, string> | undefined>(undefined);
  public readonly translateLabel = input<string>('Translate');
  public readonly stopTranslateLabel = input<string>('Stop translating');

  public toggleTranslate(): void {
    this.translating.set(!this.translating());
  }
}
