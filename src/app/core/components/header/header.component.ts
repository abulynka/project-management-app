import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Lang, LangService } from '../../services/lang.service';
import { LangTitleItem, langTitleMap } from './utils/languageTitleMap';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditBoardComponent } from '../../../project-management/components/edit-board/edit-board.component';
import { Subject, takeUntil } from 'rxjs';

const HEIGHT: number = 100;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAnimationOn: boolean = false;

  public langTitle!: LangTitleItem;

  public isShowMenu: boolean = false;

  public authorized: boolean = false;

  private component!: EditBoardComponent;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private langService: LangService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  @HostListener('window:scroll', ['$event']) public onscroll(): void {
    if (window.scrollY > HEIGHT) {
      console.log(window.scrollY);
      this.isAnimationOn = true;
    } else {
      this.isAnimationOn = false;
    }
  }

  public ngOnInit(): void {
    const curLang: Lang = this.langService.getLang();
    this.setLanguageTitle(curLang);
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
      this.setLanguageTitle('ru');
      this.langService.setLang('ru');
    } else {
      this.setLanguageTitle('en');
      this.langService.setLang('en');
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

  private setLanguageTitle(lang: Lang): void {
    this.langTitle = langTitleMap[lang];
  }
}
