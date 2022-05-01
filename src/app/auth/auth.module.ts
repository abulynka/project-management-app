import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
