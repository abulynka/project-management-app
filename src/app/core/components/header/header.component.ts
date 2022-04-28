import { Component, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public authorized: boolean = true;

  @Input() public languageTitle: string = 'Ru';

  @Input() public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.languageTitle = 'En';
    } else {
      this.languageTitle = 'Ru';
    }
  };
}
