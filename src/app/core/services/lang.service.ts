import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

export type Lang = 'en' | 'ru';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private lang: Lang = environment.defaultLocale;

  public constructor(private translate: TranslateService) {}

  public getLang(): Lang {
    return this.lang;
  }

  public setLang(newLang: Lang): void {
    this.lang = newLang;
    this.translate.use(newLang);
  }
}
