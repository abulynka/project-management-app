import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { apiRoot } from 'src/environments/environment';
import { SignInResponse, SignUpResponse } from '../models/authorization.model';
import { TokenStorageService } from '../../core/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    public http: HttpClient,
    public tokenStorage: TokenStorageService,
  ) {}

  public authorized(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  public signIn(login: string, password: string): Observable<void> {
    return this.http
      .post<SignInResponse>(`${apiRoot}/signin`, { login, password })
      .pipe(
        map((response: SignInResponse): void => {
          this.tokenStorage.saveToken(response);
        }),
      );
  }

  public signUp(
    name: string,
    login: string,
    password: string,
  ): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${apiRoot}/signup`, {
      name,
      login,
      password,
    });
  }

  public logout(): void {
    this.tokenStorage.removeToken();
  }
}
