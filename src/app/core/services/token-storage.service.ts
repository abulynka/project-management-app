import { Injectable } from '@angular/core';
const TOKEN_KEY: string = 'auth-token';
const USER_KEY: string = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public signOut(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user: string | null = sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log('user', JSON.parse(user));
      return JSON.parse(user);
    }
    return {};
  }
}
