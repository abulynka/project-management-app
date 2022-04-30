import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Lang, LangService } from '../../services/lang.service';
import { LangTitleItem, langTitleMap } from './utils/languageTitleMap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public langTitle!: LangTitleItem;

  public isShowMenu: boolean = false;

  public constructor(private langService: LangService) {}

  @Input() public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.setLanguageTitle('ru');
      this.langService.setLang('ru');
    } else {
      this.setLanguageTitle('en');
      this.langService.setLang('en');
    }
  };

  public ngOnInit(): void {
    const curLang: Lang = this.langService.getLang();
    this.setLanguageTitle(curLang);
  }

  public toggle(): void {
    this.isShowMenu = !this.isShowMenu;
  }

  private setLanguageTitle(lang: Lang): void {
    this.langTitle = langTitleMap[lang];
  }
}
