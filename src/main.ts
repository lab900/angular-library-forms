import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { MergingTranslateLoader } from './app/utils/merging-translate-loader';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideLab900Forms } from '@lab900/forms';
import { provideNgxMask } from 'ngx-mask';
import { provideNgxMatNativeDate } from '@ngxmc/datetime-picker';

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
        loadChildren: () => import('./app/modules/showcase-forms/showcase-forms.routes'),
      },
    ]),
    provideNgxMask(),
    provideNativeDateAdapter(),
    provideNgxMatNativeDate(),
    provideLab900Forms({
      formField: {
        appearance: 'fill',
      },
      amountField: {
        locale: 'de-DE',
      },
    }),
    provideMarkdown(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
}).catch(err => console.error(err));
