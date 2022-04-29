import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { authInterceptorProviders } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [LoginComponent, SignInFormComponent, SignUpFormComponent],
  imports: [CommonModule, AuthRoutingModule],
  exports: [LoginComponent],
  providers: [authInterceptorProviders],
})
export class AuthModule {}
