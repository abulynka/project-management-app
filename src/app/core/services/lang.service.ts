import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

export type ILang = 'en' | 'ru';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private lang: ILang = environment.defaultLocale;

  public constructor(private translate: TranslateService) {}

  public getLang(): ILang {
    return this.lang;
  }

  public setLang(newLang: ILang): void {
    this.lang = newLang;
    this.translate.use(newLang);
  }
}
