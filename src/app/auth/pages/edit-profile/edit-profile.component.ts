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
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public updateForm: FormGroup = {} as FormGroup;

  public user: SignUpResponse | null = this.storageService.getUser();

  public constructor(
    public userService: UserService,
    public storageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.initUpdateForm();
  }

  public onSubmit(value: SignUpData): void {
    if (this.updateForm.status === 'VALID' && this.user) {
      this.userService.updateUser(this.user.id, value).subscribe({
        next: () => {
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

  public initUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      login: new FormControl(this.user?.login, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl(this.user?.name, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
