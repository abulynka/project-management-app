/* eslint-disable @typescript-eslint/comma-dangle */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/project-management/services/user.service';
import { SignInData, SignInResponse } from '../../models/authorization.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  public form: SignInData = {
    login: '',
    password: '',
  };

  public isLoggedIn: boolean = false;

  public isLoginFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(
    public authService: AuthService,
    public userService: UserService,
    private tokenStorage: TokenStorageService
  ) {}

  public ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  public onSubmit(): void {
    const { login, password }: SignInData = this.form;
    this.authService.signIn(login, password).subscribe({
      next: (response: SignInResponse) => {
        this.tokenStorage.saveToken(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: () => {
        this.isLoginFailed = true;
      },
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
