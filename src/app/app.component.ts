import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LangService } from './core/services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(private langService: LangService) {}

  public ngOnInit(): void {
    this.initSetDefaultLanguage();
  }

  private initSetDefaultLanguage(): void {
    this.langService.setLang(environment.defaultLocale);
  }
}
