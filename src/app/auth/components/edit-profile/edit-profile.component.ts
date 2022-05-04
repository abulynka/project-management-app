import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/project-management/services/user.service';
import { SignUpData } from '../../models/authorization.model';

const MIN_LENGTH: number = 3;
const PASS_LENGTH: number = 6;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public errorMessage: boolean = false;

  public user!: FormGroup;

  public userId: string | undefined = this.storageService.getUser()?.id;

  public constructor(
    public userService: UserService,
    public storageService: TokenStorageService,
  ) {}

  public ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(PASS_LENGTH),
      ]),
    });
  }

  public onSubmit(value: SignUpData): void {
    if (this.user.status === 'VALID') {
      console.log(value, this.user.status, this.userId, this.user);
      this.userService
        .updateUser(this.userId as string, this.user.value)
        .subscribe({
          next: (response: Response) => {
            console.log(response);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else {
      this.errorMessage = true;
    }
  }
}
