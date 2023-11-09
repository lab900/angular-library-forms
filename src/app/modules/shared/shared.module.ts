import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { Lab900Form } from '@lab900/forms';
import { Lab900NavListComponent, Lab900PageHeaderComponent } from '@lab900/ui';

import { ExampleViewerComponent } from './components/example-viewer/example-viewer.component';
import { ShowcasePageComponent } from './components/showcase-page/showcase-page.component';
import { ComponentLoaderDirective } from './directives/component-loader.directive';
import { ShowcaseHomeComponent } from './components/showcase-home/showcase-home.component';
import { MarkdownPageComponent } from './components/markdown-page/markdown-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [
    ExampleViewerComponent,
    ShowcasePageComponent,
    ComponentLoaderDirective,
    ShowcaseHomeComponent,
    MarkdownPageComponent,
  ],
  exports: [
    ExampleViewerComponent,
    ShowcasePageComponent,
    ShowcaseHomeComponent,
    MarkdownPageComponent,
    Lab900Form,
    Lab900NavListComponent,
    ...material,
  ],
  imports: [
    CommonModule,
    Lab900Form,
    Lab900NavListComponent,
    Lab900PageHeaderComponent,
    MarkdownModule,
    RouterModule,
    ...material,
    TranslateModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}
