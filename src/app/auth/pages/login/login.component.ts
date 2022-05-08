import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../project-management/services/user.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = {} as FormGroup;

  public constructor(
    public authService: AuthService,
    public userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public onSubmit(): void {
    const login: string = this.loginForm.get('login')?.value;
    const password: string = this.loginForm.get('password')?.value;

    this.authService.signIn(login, password).subscribe({
      next: () => {
        this.router.navigate(['/boards']).then();
      },
      error: (response: HttpErrorResponse) => {
        let errorMessage: string = '';
        switch (response.error.message) {
          case 'User was not founded!':
            errorMessage = 'auth.user-not-found';
            break;
          default:
            errorMessage = response.error.message;
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

  public onSignUp(): void {
    this.router.navigate(['../signup'], { relativeTo: this.route }).then();
  }
}
