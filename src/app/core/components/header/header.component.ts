import { Component, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public authorized: boolean = true;

  @Input() public languageTitle: string = 'En';

  public constructor(public translate: TranslateService) {}

  @Input() public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.languageTitle = 'Ru';
      this.translate.use('ru');
    } else {
      this.languageTitle = 'En';
      this.translate.use('en');
    }
  };
}
