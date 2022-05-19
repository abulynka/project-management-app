import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
interface translateData {
  title: string;
  desc: string;
  featuresDesc: string;
  features: string[];
  info: string;
  teamTitle: string;
  team: string[];
  position: string[];
  role: string[];
}
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public translateData: translateData | undefined;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.initTranslateDataObserver();
    this.changeTranslateDataObserver();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initTranslateDataObserver(): void {
    this.translate
      .get('welcome')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: translateData) => {
        this.translateData = data;
      });
  }

  private changeTranslateDataObserver(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: LangChangeEvent) => {
        this.translateData = event.translations['welcome'];
      });
  }
}
