import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { Lab900FormsModule } from '@lab900/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MergingTranslateLoader } from './utils/merging-translate-loader';
import { HttpClient } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export function TranslationLoaderFactory(
  http: HttpClient
): MergingTranslateLoader {
  return new MergingTranslateLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),
    Lab900FormsModule.forRoot({
      formField: {
        appearance: 'fill',
      },
      amountField: {
        locale: 'de-DE',
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
