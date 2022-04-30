import { Component, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public languageTitle: string = 'En';

  @Input() public languageTitleLarge: string = 'English';

  public isShowMenu: boolean = false;

  public constructor(public translate: TranslateService) {}

  @Input() public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.languageTitle = 'Ru';
      this.languageTitleLarge = 'Russian';
      this.translate.use('ru');
    } else {
      this.languageTitle = 'En';
      this.languageTitleLarge = 'English';
      this.translate.use('en');
    }
  };

  public toggle(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
