import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/project-management/services/user.service';
import { SignUpData, SignUpResponse } from '../../models/authorization.model';
import { UserData } from '../../models/user-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../components/password.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public updateForm: FormGroup = {} as FormGroup;

  public user: SignUpResponse | undefined = this.storageService.getUser();

  public constructor(
    public userService: UserService,
    public storageService: TokenStorageService,
    public router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.initUpdateForm();
  }

  public onSubmit(value: SignUpData): void {
    if (this.updateForm.status === 'VALID' && this.user) {
      this.userService.updateUser(this.user.id, value).subscribe({
        next: (response: UserData) => {
          this.storageService.saveUser(response);
          this.translate
            .get('auth.profile-saved')
            .subscribe((message: string) => {
              this.snackBar.open(message, '', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
            });
        },
      });
    }
  }

  public deleteUser(event: MouseEvent): void {
    event.stopPropagation();

    this.translate
      .get(['auth.delete-title', 'auth.delete-message'])
      .subscribe((translates: Record<string, string>) => {
        this.dialog
          .open(ConfirmationModalComponent, {
            minWidth: '320px',
            data: {
              title: `${translates['auth.delete-title']} ${this.user?.name}!`,
              message: `${translates['auth.delete-message']} ${this.user?.name}?`,
            },
          })
          .afterClosed()
          .subscribe((result: boolean) => {
            if (result && this.user) {
              this.userService.deleteUser(this.user.id).subscribe({
                next: () => {
                  this.authService.logout();
                  this.translate
                    .get('auth.profile-deleted')
                    .subscribe((message: string) => {
                      this.snackBar.open(message, '', {
                        duration: 3000,
                        panelClass: ['green-snackbar'],
                      });
                    });
                  this.router.navigate(['']).then();
                },
              });
            }
          });
      });
  }

  public initUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      login: new FormControl(this.user?.login, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl(this.user?.name, [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        PasswordValidator.validate,
      ]),
    });
  }
}
