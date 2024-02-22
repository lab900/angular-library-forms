import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Lab900FormsModule } from '@lab900/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MergingTranslateLoader } from './utils/merging-translate-loader';
import { HttpClient } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
} from '@angular-material-components/datetime-picker';
import { CustomDateAdapter, CustomDateTimeAdapter } from './date-adapters';

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
    MatMomentDateModule,
    NgxMatMomentModule,
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
  providers: [
    provideEnvironmentNgxMask(),
    {
      provide: MAT_DATE_FORMATS,
      useValue: CustomDateAdapter.DATE_FORMATS,
    },
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: CustomDateTimeAdapter.DATE_FORMATS,
    },
    {
      provide: DateAdapter,
      useExisting: CustomDateAdapter,
    },
    {
      provide: NgxMatDateAdapter,
      useExisting: CustomDateTimeAdapter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
