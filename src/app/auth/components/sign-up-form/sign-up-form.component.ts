/* eslint-disable @typescript-eslint/comma-dangle */
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  public form: any = {
    login: null,
    name: null,
    password: null,
  };

  public isSuccessful: boolean = false;

  public isSignUpFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(public authService: AuthService) {}

  public onSubmit(): void {
    const { login, name, password }: any = this.form;
    this.authService.signUp(login, name, password).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (error: any) => {
        this.isSignUpFailed = true;
        console.log(error);
      },
    });
  }
}
