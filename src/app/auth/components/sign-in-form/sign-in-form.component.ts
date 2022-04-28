import { Component } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  public constructor(public testService: TestService) {}

  /* clickLoginInput(event: any): void {
    this.loginValue = event.target.value;
    this.authService.loginInput = event.target.value;
  }

  clickPasswordInput(event: any): void {
    this.passwordValue = event.target.value;
    this.authService.passwordInput = event.target.value;
  }*/

  public submitForm(): void {
    // this.testService.addUser();
  }
}
