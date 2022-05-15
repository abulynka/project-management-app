import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
export class WelcomeComponent implements OnInit {
  public translateData: translateData | undefined;

  public constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.updateTranslateData();
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslateData();
    });
  }

  private updateTranslateData(): void {
    this.translate.get('welcome').subscribe((data: translateData) => {
      this.translateData = data;
    });
  }
}
