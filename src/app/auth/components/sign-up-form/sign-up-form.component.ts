import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignUpData, SignUpResponse } from '../../models/authorization.model';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

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

  public constructor(
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
  ) {}

  public onSubmit(): void {
    const { name, login, password }: SignUpData = this.form;
    this.authService.signUp(name, login, password).subscribe({
      next: (response: SignUpResponse) => {
        this.tokenStorage.saveUser(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: () => {
        this.isSignUpFailed = true;
      },
    });
  }
}
