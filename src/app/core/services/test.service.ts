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

  public constructor(public http: HttpClient) {
    console.log('here');
    this.http
      .get(`${this.apiRoot}/users`, { responseType: 'json' })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  public signIn(name: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiRoot}/signin`,
      {
        name,
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
}
