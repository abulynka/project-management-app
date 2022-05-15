import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/project-management/services/user.service';
import { SignUpData } from '../../models/authorization.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public updateForm: FormGroup = {} as FormGroup;

  public userId: string | undefined = this.storageService.getUser()?.id;

  public constructor(
    public userService: UserService,
    public storageService: TokenStorageService,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.initUpdateForm();
  }

  public onSubmit(value: SignUpData): void {
    if (this.updateForm.status === 'VALID') {
      this.userService.updateUser(this.userId as string, value).subscribe({
        next: () => {},
      });
    }
  }

  public initUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
