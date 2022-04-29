/* eslint-disable @typescript-eslint/comma-dangle */
import { Component } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  public form: any = {
    login: null,
    name: null,
    password: null,
  };

  public isSuccessful: boolean = false;

  public isSignUpFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(public testService: TestService) {}

  public onSubmit(): void {
    const { login, name, password }: any = this.form;
    this.testService.signUp(login, name, password).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (error: any) => {
        this.isSignUpFailed = true;
        console.log(error);
      },
    });
    this.testService.getUsers().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
