/* eslint-disable @typescript-eslint/comma-dangle */
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  public form: any = {
    login: null,
    password: null,
  };

  public isLoggedIn: boolean = false;

  public isLoginFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(
    public testService: TestService,
    private tokenStorage: TokenStorageService
  ) {}

  public ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  public onSubmit(): void {
    const { login, password }: any = this.form;
    this.testService.signIn(login, password).subscribe({
      next: (response: any) => {
        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.reloadPage();
        console.log(response);
      },
      error: (error: any) => {
        this.isLoginFailed = true;
        console.log(error);
      },
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
