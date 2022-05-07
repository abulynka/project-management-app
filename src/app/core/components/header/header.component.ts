import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Lang, LangService } from '../../services/lang.service';
import { LangTitleItem, langTitleMap } from './utils/languageTitleMap';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public langTitle!: LangTitleItem;

  public isShowMenu: boolean = false;

  public constructor(
    private langService: LangService,
    public authService: AuthService,
    public router: Router,
  ) {}

  public changeLanguage = (event: MatSlideToggleChange): void => {
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

  public loginSingIn(): void {
    this.router.navigate(['auth/login']).then();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['']).then();
  }

  public editProfile(): void {
    this.router.navigate(['auth/edit']).then();
  }

  public home(): void {
    this.router.navigate(['']).then();
  }

  public boardsList(): void {
    this.router.navigate(['boards']).then();
  }

  private setLanguageTitle(lang: Lang): void {
    this.langTitle = langTitleMap[lang];
  }
}
