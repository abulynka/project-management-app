/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRoot } from 'src/environments/environment';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(public http: HttpClient) {}

  public signIn(login: string, password: string): Observable<ArrayBuffer> {
    return this.http.post(
      `${apiRoot}/signin`,
      {
        login,
        password,
      },
      httpOptions
    );
  }

  public signUp(
    name: string,
    login: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      `${apiRoot}/signup`,
      {
        name,
        login,
        password,
      },
      httpOptions
    );
  }
}
