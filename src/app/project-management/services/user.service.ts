/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  public updateUser(id: string, _userData: SignUpData): Observable<Response> {
    return this.http.put<Response>(`${apiRoot}/users/${id}`, _userData);
  }

  public deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(`${apiRoot}/users/${id}`);
  }
}
