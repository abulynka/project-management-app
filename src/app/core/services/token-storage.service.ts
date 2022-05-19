import { Injectable } from '@angular/core';
import {
  SignUpResponse,
  SignInResponse,
} from 'src/app/auth/models/authorization.model';
import { TOKEN_KEY } from 'src/environments/environment';
import { USER_KEY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public saveToken(response: SignInResponse): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, response.token);
  }

  public removeToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  public removeUser(): void {
    sessionStorage.removeItem(USER_KEY);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(response: SignUpResponse): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(response));
  }

  public getUser(): SignUpResponse | undefined {
    const user: string | null = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  }
}
