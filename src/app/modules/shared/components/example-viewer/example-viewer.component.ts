import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { MatIconButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

export interface ExampleFile {
  extension: string;
  data: string;
  format: string;
}

@Component({
  selector: 'lab900-example-viewer',
  templateUrl: './example-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    LowerCasePipe,
    MatCard,
    MatCardHeader,
    MatTooltip,
    MatIcon,
    MatCardContent,
    MarkdownComponent,
    MatCardTitle,
    MatIconButton,
    MatTabGroup,
    MatTab,
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
    this.exampleName = this.exampleComponent?.nativeElement?.children?.[0]?.localName.replace('lab900-', '');
  }
}
