import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownModule } from 'ngx-markdown';
import { LowerCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ExampleFile {
  extension: string;
  data: string;
  format: string;
}

@Component({
  selector: 'lab900-example-viewer',
  templateUrl: './example-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    MatTabsModule,
    MarkdownModule,
    LowerCasePipe,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ExampleViewerComponent implements AfterViewInit {
  @Input()
  public extensions = ['HTML', 'TS', 'SCSS'];

  @Input()
  public fileDir?: string;

  @Input()
  public exampleTitle: string;

  @Input()
  public exampleName: string;

  @ViewChild('exampleComponent')
  public exampleComponent: ElementRef;

  public showSource = false;

  public trackExampleFile(index: number, file: ExampleFile): string {
    return file.extension;
  }

  public toggleSourceView(): void {
    this.showSource = !this.showSource;
  }

  public ngAfterViewInit(): void {
    this.exampleName =
      this.exampleComponent?.nativeElement?.children?.[0]?.localName.replace(
        'lab900-',
        '',
      );
  }
}
