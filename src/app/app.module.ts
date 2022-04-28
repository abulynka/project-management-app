import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignUpFormComponent } from './auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './auth/components/sign-in-form/sign-in-form.component';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SignInFormComponent, SignUpFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
