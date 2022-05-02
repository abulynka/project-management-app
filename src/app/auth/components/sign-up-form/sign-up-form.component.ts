/* eslint-disable @typescript-eslint/comma-dangle */
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignUpData } from '../../models/authorization.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  public form: SignUpData = {
    name: '',
    login: '',
    password: '',
  };

  public isSuccessful: boolean = false;

  public isSignUpFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(public authService: AuthService) {}

  public onSubmit(): void {
    const { name, login, password }: SignUpData = this.form;
    this.authService.signUp(name, login, password).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: () => {
        this.isSignUpFailed = true;
      },
    });
  }
}
