import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ValueLabel } from '../../models/form-field-base';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lab900-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    NgForOf,
    MatTooltipModule,
    NgIf,
    MatIconModule,
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

  @Input({ required: true })
  public languages!: ValueLabel[];

  @Input({ required: true })
  public activeLanguage!: ValueLabel;

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
