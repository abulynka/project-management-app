import { Component } from '@angular/core';
import { SignUpData, SignUpResponse } from '../../models/authorization.model';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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
