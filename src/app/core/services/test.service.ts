/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TestService {
  public apiRoot: string = 'http://localhost:4200/api';

  public user: any;

  public constructor(public http: HttpClient) {}

  public signIn(login: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiRoot}/signin`,
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
      `${this.apiRoot}/signup`,
      {
        name,
        login,
        password,
      },
      httpOptions
    );
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.apiRoot}/users`, httpOptions);
  }
}
