import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  SignUpData,
  SignUpResponse,
} from 'src/app/auth/models/authorization.model';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(public http: HttpClient) {}

  public getUsers(): Observable<SignUpResponse[]> {
    return this.http.get<SignUpResponse[]>(`${apiRoot}/users`);
  }

  public getUserById(id: string): Observable<Response> {
    return this.http.get<Response>(`${apiRoot}/users/${id}`);
  }

  public getUserByLoginName(
    login: string,
  ): Observable<SignUpResponse | undefined> {
    return this.getUsers().pipe(
      map((users: SignUpResponse[]) => {
        return users.find((user: SignUpResponse) => user.login === login);
      }),
    );
  }

  public updateUser(id: string, userData: SignUpData): Observable<Response> {
    return this.http.put<Response>(`${apiRoot}/users/${id}`, userData);
  }

  public deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(`${apiRoot}/users/${id}`);
  }
}
