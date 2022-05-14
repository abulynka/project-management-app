import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Lang, LangService } from '../../services/lang.service';
import { LangTitleItem, langTitleMap } from './utils/languageTitleMap';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditBoardComponent } from '../../../project-management/components/edit-board/edit-board.component';
import { Subject, takeUntil } from 'rxjs';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public langTitle!: LangTitleItem;

  public isShowMenu: boolean = false;

  public authorized: boolean = false;

  public langaugeChecked: boolean = false;

  private component!: EditBoardComponent;

  private destroy$: Subject<void> = new Subject<void>();

  private readonly lang: string = 'language';

  public constructor(
    private langService: LangService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private dataStorageService: DataStorageService,
  ) {}

  public ngOnInit(): void {
    const lang: Lang =
      (this.dataStorageService.getItem(this.lang) as Lang) || 'en';
    this.switchLanguage(lang);
    this.langaugeChecked = lang !== 'en';

    this.authorized = this.authService.authorized();
    this.authService.authorizeChangeStatus$.subscribe((authorized: boolean) => {
      this.authorized = authorized;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.switchLanguage('ru');
    } else {
      this.switchLanguage('en');
    }
  };

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

  public createNewBoard(): void {
    this.component = this.dialog.open(EditBoardComponent).componentInstance;

    this.component.boardProcessed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: string) => {
        this.dialog.closeAll();
        this.router.navigate(['boards', id]).then();
      });
  }

  private switchLanguage(lang: Lang): void {
    this.setLanguageTitle(lang);
    this.langService.setLang(lang);
    this.dataStorageService.setItem(this.lang, lang);
  }

  private setLanguageTitle(lang: Lang): void {
    this.langTitle = langTitleMap[lang];
  }
}
