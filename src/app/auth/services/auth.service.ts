import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRoot } from 'src/environments/environment';
import { SignInResponse, SignUpResponse } from '../models/authorization.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isEditProfileOpen: boolean = false;

  public constructor(public http: HttpClient) {}

  public signIn(login: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${apiRoot}/signin`, {
      login,
      password,
    });
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
}
