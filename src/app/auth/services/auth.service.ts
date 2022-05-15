import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { apiRoot } from 'src/environments/environment';
import { SignInResponse, SignUpResponse } from '../models/authorization.model';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { UserService } from '../../project-management/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authorizeChangeStatusSource: Subject<boolean> = new Subject<boolean>();

  public authorizeChangeStatus$: Observable<boolean> =
    this.authorizeChangeStatusSource.asObservable();

  public constructor(
    public http: HttpClient,
    public tokenStorage: TokenStorageService,
    public userService: UserService,
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
          this.authorizeChangeStatusSource.next(this.authorized());

          this.userService
            .getUserByLoginName(login)
            .subscribe((user: SignUpResponse | undefined): void => {
              if (user) {
                this.tokenStorage.saveUser(user);
              }
            });
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
    this.tokenStorage.removeUser();
    this.authorizeChangeStatusSource.next(this.authorized());
  }
}
