import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public authorized: boolean = true;

  @Input() public languageTitle: string = 'Ru';

  private static capitalizeFirstLetter(message: string): string {
    return message.charAt(0).toUpperCase() + message.slice(1);
  }

  @Input() public changeLanguage = (event: MatSlideToggleChange): void => {
    if (event.checked) {
      this.languageTitle = 'En';
    } else {
      this.languageTitle = 'Ru';
    }
  };

  @Input() public translate(name: string): string {
    return HeaderComponent.capitalizeFirstLetter(name);
  }

  public ngOnInit(): void {}
}
