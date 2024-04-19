import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MergingTranslateLoader } from './app/utils/merging-translate-loader';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideLab900Forms } from '@lab900/forms';
import { provideNgxMask } from 'ngx-mask';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

if (environment.production) {
  enableProdMode();
}

function TranslationLoaderFactory(http: HttpClient): MergingTranslateLoader {
  return new MergingTranslateLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter([
      {
        path: '',
        loadChildren: () =>
          import('./app/modules/showcase-forms/showcase-forms.routes'),
      },
    ]),
    provideNgxMask(),
    provideNativeDateAdapter(),
    provideLab900Forms({
      formField: {
        appearance: 'fill',
      },
      amountField: {
        locale: 'de-DE',
      },
    }),
    importProvidersFrom(
      NgxMatNativeDateModule,
      MarkdownModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: TranslationLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
    ),
  ],
}).catch((err) => console.error(err));
