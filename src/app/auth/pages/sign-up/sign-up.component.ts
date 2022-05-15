import { Component, OnInit } from '@angular/core';
import { SignUpResponse } from '../../models/authorization.model';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup = {} as FormGroup;

  public isSuccessful: boolean = false;

  public isSignUpFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
  ) {}

  public get login(): AbstractControl | null {
    return this.signUpForm.get('login');
  }

  public get name(): AbstractControl | null {
    return this.signUpForm.get('name');
  }

  public get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  public ngOnInit(): void {
    this.initSignUpForm();
  }

  public onSubmit(): void {
    const login: string = this.login?.value;
    const name: string = this.name?.value;
    const password: string = this.password?.value;

    this.authService.signUp(name, login, password).subscribe({
      next: (response: SignUpResponse) => {
        this.tokenStorage.saveUser(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (response: HttpErrorResponse) => {
        this.isSignUpFailed = true;
        let errorMessage: string = '';
        switch (response.error.message) {
          case 'User was not founded!':
            errorMessage = 'auth.user-not-found';
            break;
          default:
            errorMessage = response.message;
            break;
        }
        this.translate
          .get([errorMessage, 'dialog.close'])
          .subscribe((message: Record<string, string>) => {
            this.snackBar.open(message[errorMessage], message['dialog.close'], {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          });
      },
    });
  }

  public initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
