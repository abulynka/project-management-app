import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
