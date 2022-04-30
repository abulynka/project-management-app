import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ILang, LangService } from '../../services/lang.service';
import { ILangTitleItem, langTitleMap } from './utils/languageTitleMap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public langTitle!: ILangTitleItem;

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
    const curLang: ILang = this.langService.getLang();
    this.setLanguageTitle(curLang);
  }

  public toggle(): void {
    this.isShowMenu = !this.isShowMenu;
  }

  private setLanguageTitle(lang: ILang): void {
    this.langTitle = langTitleMap[lang];
  }
}
